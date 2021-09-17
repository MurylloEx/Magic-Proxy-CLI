import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'magic-section',
  templateUrl: './magic-section.component.html',
  styleUrls: ['./magic-section.component.css']
})
export class MagicSectionComponent implements OnInit {

  @Input() mgTitle: string = "";
  @Input() mgIcon: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
