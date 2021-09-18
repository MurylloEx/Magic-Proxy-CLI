import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'magic-preference',
  templateUrl: './magic-preference.component.html',
  styleUrls: ['./magic-preference.component.css']
})
export class MagicPreferenceComponent implements OnInit {

  m_AllowUnknownHosts: boolean = false;
  m_AllowWebsockets: boolean = false;
  m_HttpEnabled: boolean = false;
  m_HttpsEnabled: boolean = false;
  m_HstsEnabled: boolean = false;
  m_HttpPort: number = 80;
  m_HttpsPort: number = 443;

  constructor() { }

  ngOnInit(): void {
  }

}
