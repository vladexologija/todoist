import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: any;
  @Output() toggleEditMode: EventEmitter<any> = new EventEmitter();
  @Output() saveItem: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('item', this.item);
    
  }


}
