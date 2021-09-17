import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-magic-panel',
  templateUrl: './magic-panel.component.html',
  styleUrls: ['./magic-panel.component.css']
})
export class MagicPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  doClick(event){
    console.log(event)
  }

}
