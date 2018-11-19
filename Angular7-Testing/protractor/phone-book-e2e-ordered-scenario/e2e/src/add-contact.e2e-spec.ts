import { browser, by, element } from "protractor";


describe('Adding a contact', () => {
  beforeAll(() => {
    browser.get('#');
    element(by.id('add')).click();
  });

  it('Should fill out first name', () => {
    element(by.name('firstName')).sendKeys('Cave');
    expect(element(by.name('firstName')).getAttribute('value')).toEqual('Cave')
  });

  it('Should fill out last name', () => {
    element(by.name('lastName')).sendKeys('Johnson');
    expect(element(by.name('lastName')).getAttribute('value')).toEqual('Johnson')
  });

  it('Should validate e-mail', () => {
    element(by.name('email')).sendKeys('notanemail');
    expect(element(by.name('email')).getAttribute('class')).toContain("ng-invalid");
    element(by.name('email')).clear()
  });

  it('Should fill out e-mail', () => {
    element(by.name('email')).sendKeys('cave@aperturescience.com');
    expect(element(by.name('email')).getAttribute('value')).toEqual('cave@aperturescience.com')
  });

  it('Should submit form successfully', () => {
    const addButton = element(by.css("input[type='submit']"));
    const form      = element(by.tagName('form'));
    addButton.click();
    expect(form.isPresent()).toEqual(false);
  });

  it('List should have one more item', () => {
    const list = element(by.tagName('contacts-list')).all(by.tagName('li'));
    expect(list.count()).toEqual(6);
  })
});
