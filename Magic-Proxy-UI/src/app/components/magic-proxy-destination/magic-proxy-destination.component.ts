import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'magic-proxy-destination',
  templateUrl: './magic-proxy-destination.component.html',
  styleUrls: ['./magic-proxy-destination.component.css']
})
export class MagicProxyDestinationComponent implements OnInit {

  @Input() mgDestinationType: string = "http/https";

  m_Destinations: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSave(event){
    document.body.click();
  }

  onAdd(event){
    this.m_Destinations.push("");
  }

  onRemove(event){
    this.m_Destinations.splice(-1, 1);
  }

}
