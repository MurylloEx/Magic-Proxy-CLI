import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'magic-widget',
  templateUrl: './magic-widget.component.html',
  styleUrls: ['./magic-widget.component.css']
})
export class MagicWidgetComponent implements OnInit {

  @Input() mgColor: string = "var(--blue-700)";
  @Input() mgIcon: string = "";
  @Input() mgClass: string = "";
  @Input() mgStyle: string = "";
  @Input() mgTitle: string = "";
  @Output() click: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  onClick(event: any) {
    this.click.emit(event);
  }
  
  ngOnInit(): void {
  }

}
