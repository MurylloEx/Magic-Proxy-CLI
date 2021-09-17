import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-magic-panel',
  templateUrl: './magic-panel.component.html',
  styleUrls: ['./magic-panel.component.css']
})
export class MagicPanelComponent implements OnInit {

  m_SectionNumber: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  onSectionChange(index: number){
    this.m_SectionNumber = index;
  }

}
