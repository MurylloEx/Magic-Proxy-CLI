import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';

class AcmeRequestData {
  public email: string;
  public domains: string[];
}

interface ChallengeResponse {
  auth: any,
  challenge?: any,
  key: string,
  success: boolean
}

interface OrderResponse {
  client: any,
  account: any,
  order: any
}

interface AcmeOrderChallenge {
  orderResponse: OrderResponse,
  challengeResponses: ChallengeResponse[],
  acmeRequestData: AcmeRequestData
}

@Component({
  selector: 'magic-certificates',
  templateUrl: './magic-certificates.component.html',
  styleUrls: ['./magic-certificates.component.css']
})
export class MagicCertificatesComponent implements OnInit {

  m_StepIndex: number = 0;
  m_DomainNames: string = "";
  m_ContactEmail: string = "";
  m_PrivateKey: string = "";
  m_Certificate: string = "";
  m_CertificateSigningRequest: string = "";
  m_IsLoading: boolean = false;
  m_Challenges: ChallengeResponse[] = [];
  m_RequestId: number = 0;

  constructor(
    private api: ApiService,
    private notification: NotificationService) { }

  ngOnInit(): void {
  }

  async onPreviousStep(event){
    if (this.m_StepIndex > 0)
      if (await this.onStepChange(this.m_StepIndex - 1))
        this.m_StepIndex--;
  }

  async onNextStep(event){
    if (this.m_StepIndex < 2)
      if (await this.onStepChange(this.m_StepIndex + 1))
        this.m_StepIndex++;
  }

  async onStepChange(step: number){
    if (step == 0)
      return await this.onSettingUpFields();
    if (step == 1)
      return await this.onDomainSpecificated();
    if (step == 2)
      return await this.onChallengeCompleted();
  }

  async onSettingUpFields(){
    this.m_DomainNames = "";
    this.m_ContactEmail = "";
    this.m_PrivateKey = "";
    this.m_Certificate = "";
    this.m_CertificateSigningRequest = "";
    this.m_IsLoading = false;
    this.m_Challenges = [];
    this.m_RequestId = 0;
    this.m_StepIndex = 0;
  }

  async onDomainSpecificated(){
    this.m_IsLoading = true;
    let { error, data } = await this.api.createAcmeRequest({
      email: this.m_ContactEmail,
      domains: this.m_DomainNames.split(new RegExp(/[\s,\n]/gm))
    });
    this.m_IsLoading = false;
    if (!error){
      this.m_RequestId = data.id;
      this.m_Challenges = data.challenges;
      this.notification.success()
        .title("Successfully received ACME challenge!")
        .append("Challenge created with success. Now, you need place some DNS ")
        .append("records in your domains.")
        .closable()
        .go();
    } else {
      this.notification.error()
        .title("Failed to request ACME challenge!")
        .append("Couldn't create the ACME request for DNS challenge. Did you ")
        .append("provided a valid email and domain?")
        .closable()
        .go();
    }
    return !error;
  }

  async onChallengeCompleted(){
    this.m_IsLoading = true;
    let { error } = await this.api.completeAcmeRequest(this.m_RequestId);
    if (!error){
      let { error, data } = await this.api.fetchAcmeRequestCertificate(this.m_RequestId);
      if (!error){
        const { cert, key, csr } = data;
        this.m_Certificate = cert;
        this.m_PrivateKey = key;
        this.m_CertificateSigningRequest = csr;
        this.notification.success()
          .title("Successfully received certificate!")
          .append("Congratulations! The certificate was issued with success, ")
          .append("now you can set up your TLS settings with your new certificate.")
          .closable().go();
      }
    } else {
      this.m_IsLoading = false;
      this.notification.error()
        .title("Failed to complete challenges!")
        .append("One of your domains cannot be verified. Please, check your DNS records again.")
        .closable().go();
    }
    return !error;
  }

}
