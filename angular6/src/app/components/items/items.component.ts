import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() items: any;
  @Output() onAddItem: EventEmitter<any> = new EventEmitter();
  @Output() toggleEditMode: EventEmitter<any> = new EventEmitter();
  @Output() saveItem: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addItem() {
    this.onAddItem.emit({
      // TODO use constant for new element
      id: '12345',
      projectId: '5b1e866b3030f26f9860ed5b',
      checked: false,
      isEditMode: true
    });
  }



}
