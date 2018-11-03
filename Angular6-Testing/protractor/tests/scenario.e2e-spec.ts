
import { browser, by, element } from "protractor";
import { hasClass } from "../../../utils/hasClass";

describe('Filling out a form', () => {

  beforeAll(() => {
    browser.get('#');
    element(by.id('add')).click();
  });

  describe('Filling out a form field', () => {
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
      expect(hasClass(element(by.name('email')), "ng-invalid")).toBe(true);
      element(by.name('email')).clear()
    });

    it('Should fill out e-mail', () => {
      element(by.name('email')).sendKeys('cave@aperturescience.com');
      expect(element(by.name('email')).getAttribute('value')).toEqual('cave@aperturescience.com')
    });
  });

});
