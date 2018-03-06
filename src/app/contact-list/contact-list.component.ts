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
      // check if contact needs to be added back into specific place from an 'undo'
      this.contacts.splice(index, 0, name)
    } else {
      this.contacts.push(name)
    }
    // Temperary contact created to pass as argument to deleteContact
    let tempContact= {
      contact: name,
      i: !isNaN(index) ? index : this.contacts.length-1
    }
    if (context === 'from undo') {
      this.addRedo(this.deleteContact, tempContact)
    } else {
      if (context === 'from redo') {
        this.addUndo(this.deleteContact, tempContact)  
      } else {
        this.addUndo(this.deleteContact, tempContact)
        this.redoList = [];
      } 
    }
    this.contactName = ''
  }

  deleteContact(contact, context) {
    this.contacts.splice(contact.i, 1)

    if (context === 'from undo') {
      this.addRedo(this.addContact, [contact.contact, contact.i])
    } else {
      if (context === 'from redo') {
        this.addUndo(this.addContact, [contact.contact, contact.i])
        
      } else {
        this.addUndo(this.addContact, [contact.contact, contact.i])
        this.redoList=[];
    }
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
      newestRedo[0].call(this, ...newestRedo[1], 'from redo')
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

