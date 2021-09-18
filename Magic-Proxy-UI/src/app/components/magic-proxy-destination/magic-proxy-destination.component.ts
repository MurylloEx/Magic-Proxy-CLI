import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'magic-proxy-destination',
  templateUrl: './magic-proxy-destination.component.html',
  styleUrls: ['./magic-proxy-destination.component.css']
})
export class MagicProxyDestinationComponent implements OnInit {

  @Input() mgDestinationType: string = "http/https";
  @Input() mgDestinations: string[] = [];
  @Output() mgDestinationsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  onSave(event){
    this.mgDestinationsChange.emit(this.mgDestinations);
    document.body.click();
  }

  onAdd(event){
    this.mgDestinations.push("");
    this.mgDestinationsChange.emit(this.mgDestinations);
  }

  onRemove(event){
    this.mgDestinations.splice(-1, 1);
    this.mgDestinationsChange.emit(this.mgDestinations);
  }

  trackByFn(index, item) {
    return index;
  }

}
