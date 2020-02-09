import { browser, by, element } from "protractor";

describe('Filling out a form field', () => {
  it('Should fill out first name', () => {
    browser.get('#');
    element(by.id('add')).click();
    element(by.name('firstName')).sendKeys('Protractored');
    expect(element(by.name('firstName')).getAttribute('value')).toEqual('Protractored')
  });
});
