import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input() contacts: Array<any>;
  @Input() contactName: string = '';
  undoList = []
  redoList= []

  addUndo(func, args) {
    this.undoList.push([func, args])   
  }

  addRedo(func, args) {
    this.redoList.push([func, args])
  }

  addContact(name, index, context) {
    if (index || index === 0) {
      this.contacts.splice(index, 0, name)
    } else {
      this.contacts.push(name)
    }
   
    let tempContact= {
      contact: name,
      i: !isNaN(index) ? index : this.contacts.length-1
    }
    if (context === 'from undo') {
      this.addRedo(this.deleteContact, tempContact)
    } else {
      this.addUndo(this.deleteContact, tempContact)
    }
    
    this.contactName = ''
  }

  deleteContact(contact, context) {
    this.contacts.splice(contact.i, 1)

    if (context !== 'from undo') {
      this.addUndo(this.addContact, [contact.contact, contact.i])
    } else {
      this.addRedo(this.addContact, [contact.contact, contact.i])
    }
  }

  undo() {
    if (this.undoList.length > 0) {
      let newestUndo = this.undoList[this.undoList.length-1]
      newestUndo[0].call(this, ...newestUndo[1], 'from undo')  
      this.undoList.pop()
    } else {
      return
    } 
  }

  redo() {
    if (this.redoList.length > 0) {
      let newestRedo = this.redoList[this.redoList.length-1]
      newestRedo[0].call(this, ...newestRedo[1])
      this.redoList.pop()
    } else {
      return
    } 
  }
  constructor() {

  }

  ngOnInit() {
  }

}
