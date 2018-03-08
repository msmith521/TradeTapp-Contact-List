import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../app.component';
import { ContactListComponent } from './contact-list.component';
import { ContactComponent } from '../contact/contact.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  const tempContact = {
      contact: 'Matthew',
      i : 0
    }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent,
        ContactListComponent,
        ContactComponent],
      imports: [
        BrowserModule,
        FormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // expect(compiled.querySelector('h1').textContent).toContain("Matt's awesome contact list");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an input bar', () => {
    const fixture = TestBed.createComponent(ContactListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#addContactInput')).toBeTruthy()
  })

  it('should render an add button', () => {
    const fixture = TestBed.createComponent(ContactListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#addContactButton')).toBeTruthy()

  })

  it('should render an undo button', () => {
    const fixture = TestBed.createComponent(ContactListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#undoButton')).toBeTruthy()

  })

  it('should render a redo button', () => {
    const fixture = TestBed.createComponent(ContactListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#redoButton')).toBeTruthy()
  })

  it('should have an add user function', () => {
    expect(component.addContact).toBeTruthy()
  });

  it('should add a user when the add user function is called', () => {
    component.addContact('Matthew')
    expect(component.contacts.indexOf('Matthew')).toBeGreaterThanOrEqual(0)

  })

  it('should have a delete user function', () => {
    expect(component.deleteContact).toBeTruthy()
  });

  it('should delete a user when the delete user function is called', () => {
    component.addContact('Matthew')
    component.deleteContact(tempContact)
    expect(component.contacts.indexOf('Matthew')).toBeLessThan(0)
  })

  it('should have an undo function', () => {
    expect(component.undo).toBeTruthy()
  })

  it('should undo an add', async(() => {
    component.addContact('Matthew')
    // console.log(component)
    component.undo()
    expect(component.contacts.indexOf('Matthew')).toBeLessThan(0)
  }))

  it('should undo a delete', async(() => {
    component.addContact('Matthew')
    component.deleteContact(tempContact)
  
    component.undo()
  
    expect(component.contacts.indexOf('Matthew')).toBeGreaterThanOrEqual(0)
  }))

  it('should have a redo function', () => {
    expect(component.redo).toBeTruthy()
  })

  it('should redo an add', () => {
    component.addContact('Matthew')
    component.undo()
    component.redo()
    expect(component.contacts.indexOf('Matthew')).toBeGreaterThanOrEqual(0)
  })

  it('should redo a delete', () => {
    component.addContact('Matthew')

    component.deleteContact(tempContact)
    component.undo()
    component.redo()
    expect(component.contacts.indexOf('Matthew')).toBeLessThan(0)
  })



});
