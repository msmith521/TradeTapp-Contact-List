import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input('contact') contact: string
  @Input() contacts: Array<any>;
  @Input('i') i: number;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  onClick() {
    this.delete.emit(this)
  }
  constructor() { }

  ngOnInit() {
  }

}
