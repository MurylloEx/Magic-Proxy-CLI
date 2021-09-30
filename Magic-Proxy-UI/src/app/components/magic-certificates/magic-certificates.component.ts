import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'magic-certificates',
  templateUrl: './magic-certificates.component.html',
  styleUrls: ['./magic-certificates.component.css']
})
export class MagicCertificatesComponent implements OnInit {

  m_StepIndex: number = 0;
  m_DomainNames: string = "";
  m_ContactEmail: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onPreviousStep(event){
    if (this.m_StepIndex > 0)
      this.m_StepIndex--;
  }

  onNextStep(event){
    if (this.m_StepIndex < 2)
      this.m_StepIndex++;
  }

}
