import { Injectable } from '@nestjs/common';
import { Account, Challenge } from 'acme-client/types/rfc8555';
import { Client, forge, directory, Order, Authorization} from 'acme-client';

export interface ChallengeResponse {
  auth?: Authorization,
  challenge?: Challenge,
  key?: string,
  success?: boolean
}

export interface OrderResponse {
  client?: Client,
  account?: Account,
  order?: Order
}

@Injectable()
export class AcmeService {

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
        if (!challenge || !auth)
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
    /* Finalize order */
    const [key, csr] = await forge.createCsr({
      commonName: commonName,
      altNames: altNames
    });
    await client.finalizeOrder(order, csr);
    const cert = Buffer.from(await client.getCertificate(order));
    return {csr, key, cert}
  }
  
}
