import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'magic-proxy',
  templateUrl: './magic-proxy.component.html',
  styleUrls: ['./magic-proxy.component.css']
})
export class MagicProxyComponent implements OnInit {

  m_Proxies: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
