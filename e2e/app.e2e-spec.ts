import { AppPage } from './app.po';

describe('trade-tapp-contact-list App', () => {
  let page: AppPage;
  let contactList = element.all(by.className('contact'))

  beforeEach(() => {
    page = new AppPage();

  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("Matt's awesome contact list");
  });

 it('should initialize with 5 contacts', () => {
    page.navigateTo();
    expect(contactList.count()).toEqual(5)
  });

 it('should add a new contact', () => {
    page.navigateTo();
    element(by.id('addContactInput')).sendKeys('Bobby')
    element(by.id('addContactButton')).click()
    expect(contactList.count()).toEqual(6)
  });

  it('should clear the input bar after adding a contact', () => {
    page.navigateTo() 
    element(by.id('addContactInput')).sendKeys('Bobby')
    element(by.id('addContactButton')).click()
    expect(element(by.id('addContactInput')).getText()).toEqual('')
  });

 it('should add the correct contact', () => {
    page.navigateTo()
    element(by.id('addContactInput')).sendKeys('Bobby')
    element(by.id('addContactButton')).click()
    expect(contactList.last().getText()).toEqual('Bobby Delete')
  });

  it('should delete a contact', () => {
    page.navigateTo()
    contactList.last().element(by.className('deleteButton')).click()
    expect(contactList.count()).toEqual(4)
  });

  it('should delete the correct contact', () => {
    page.navigateTo();
    contactList.last().element(by.className('deleteButton')).click()
    expect(contactList.last().getText()).toEqual('Summer Delete')
  });

  it('should undo an add', () => {
    page.navigateTo();
    element(by.id('addContactInput')).sendKeys('Bobby')
    element(by.id('addContactButton')).click()
    element(by.id('addContactInput')).sendKeys('Matthew')
    element(by.id('addContactButton')).click()
    element(by.id('undoButton')).click()
    expect(contactList.last().getText()).toEqual('Bobby Delete')
  });

  it('should undo a delete', () => {
    page.navigateTo();
    contactList.last().element(by.className('deleteButton')).click()
    element(by.id('undoButton')).click()
    expect(contactList.last().getText()).toEqual('Morty Delete')
  });

  it('should return the contact to the correct index when undoing a delete', () => {
    page.navigateTo();
    contactList.first().element(by.className('deleteButton')).click()
    element(by.id('undoButton')).click()
    expect(contactList.first().getText()).toEqual('Rick Delete')
  });

  it('should redo an undid add', () => {
    page.navigateTo();
    element(by.id('addContactInput')).sendKeys('Bobby')
    element(by.id('addContactButton')).click()
    element(by.id('addContactInput')).sendKeys('Matthew')
    element(by.id('addContactButton')).click()
    element(by.id('undoButton')).click()
    element(by.id('redoButton')).click()
    expect(contactList.last().getText()).toEqual('Matthew Delete')
  });

  it('should redo an undid delete', () => {
    page.navigateTo();
    contactList.first().element(by.className('deleteButton')).click()
    element(by.id('undoButton')).click();
    element(by.id('redoButton')).click();
    expect(contactList.first().getText()).toEqual('Beth Delete')
  })
});
