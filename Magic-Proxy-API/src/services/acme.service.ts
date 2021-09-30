import { AcmeRequestData } from 'src/data/acme-request.data';
import { Account, Challenge } from 'acme-client/types/rfc8555';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Client, forge, directory, Order, Authorization} from 'acme-client';

export interface ChallengeResponse {
  auth: Authorization,
  challenge?: Challenge,
  key: string,
  success: boolean
}

export interface OrderResponse {
  client: Client,
  account: Account,
  order: Order
}

export interface AcmeOrderChallenge {
  orderResponse: OrderResponse,
  challengeResponses: ChallengeResponse[],
  acmeRequestData: AcmeRequestData
}

@Injectable()
export class AcmeService {

  private AcmeOrders: AcmeOrderChallenge[] = [];

  async createOrders(email: string, domains: string[]){
    const client = new Client({
      directoryUrl: directory.letsencrypt.staging,
      accountKey: await forge.createPrivateKey()
    });
    const account = await client.createAccount({
      termsOfServiceAgreed: true,
      contact: ['mailto:' + email]
    });
    const order = await client.createOrder({
      identifiers: domains.map(v => {
        return { type: 'dns', value: v }
      })
    });
    return <OrderResponse>{client,account,order}
  }
  
  async getChallenges(client: Client, order: Order){
    const authorizations = await client.getAuthorizations(order);
    const responses = authorizations.map(async (auth) => {
      const { challenges } = auth;
      let challenge = challenges.filter(({type}) => type == "dns-01").pop();
      if (!challenge)
        return <ChallengeResponse>{auth, challenge, key: '', success: false};
      const key = await client.getChallengeKeyAuthorization(challenge);
      return <ChallengeResponse>{auth, challenge, key, success: true}
    });
    return Promise.all(responses);
  }
  
  async waitForChallenges(client: Client, challenges: ChallengeResponse[]){
    let e = 0;
    for (let c = 0; c < challenges.length; c++){
      const {challenge, auth} = challenges[c];
      try {
        if (!challenge || !challenges[c]?.success)
          throw new Error();
        /* Verify that challenge is satisfied */
        await client.verifyChallenge(auth, challenge);
        /* Notify ACME provider that challenge is satisfied */
        await client.completeChallenge(challenge);
        /* Wait for ACME provider to respond with valid status */
        await client.waitForValidStatus(challenge);
      }
      catch (_) { e++ }
    }
    return e;
  }
  
  async generateCertificates(client: Client, order: Order, commonName: string, altNames: string[]){
    try{
      const [key, csr] = await forge.createCsr({
        commonName: commonName,
        altNames: altNames
      });
      await client.finalizeOrder(order, csr);
      const cert = Buffer.from(await client.getCertificate(order));
      return {csr, key, cert}
    } catch(_) { return false }
  }

  async createRequest(data: AcmeRequestData){
    try{
      let orderResponse = await this.createOrders(data.email, data.domains);
      let challengeResponses = await this.getChallenges(
        orderResponse.client,
        orderResponse.order);
      this.AcmeOrders.push({
        orderResponse,
        challengeResponses,
        acmeRequestData: data
      });
      return { 
        id: this.AcmeOrders.length-1,
        challenges: challengeResponses
      }
    } catch(_){
      throw new BadRequestException("Couldn't create the request for ACME challenges.");
    }
  }

  async completeChallenges(requestId: number){
    try{
      const { orderResponse, challengeResponses } = this.AcmeOrders[requestId];
      const { client } = orderResponse;
      let result = await this.waitForChallenges(client, challengeResponses);
      if (result != 0){
        this.AcmeOrders.splice(requestId, 1);
        throw new Error();
      }
      return true;
    } catch(_){
      throw new BadRequestException("Couldn't complete the ACME request.");
    }
  }

  async getCertificates(requestId: number){
    try{
      const [{ orderResponse, acmeRequestData }] = this.AcmeOrders.splice(requestId,1);
      const { client, order } = orderResponse;
      const { domains } = acmeRequestData;
      let certificates = await this.generateCertificates(client, order, domains[0], domains);
      if (!certificates)
        throw new Error();
      const { cert, key, csr } = certificates;
      return {
        cert: cert.toString(),
        key: key.toString(),
        csr: csr.toString()
      }
    } catch(_){
      throw new BadRequestException("Couldn't generate the certificates.");
    }
  }

}
