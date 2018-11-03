import { browser } from 'protractor'
import { HomePageObject } from './page-objects/home.pageObject'
import { DetailsPageObject } from './page-objects/details.pageObject'
import { contactAdd, contactEdit } from "./mock-data/contacts";

describe('Details page', () => {

  let homepage = new HomePageObject()
  let detailpage = new DetailsPageObject()

  beforeEach(() => {
    browser.get('#')
  });

  it('Should select Alyx VANCE', () => {
    homepage.selectContact(1)
    detailpage.validateSelectedUser('Alyx', 'Vance', 'alyx@resistance.com');
  });

  it('Should edit a contact', () => {
    homepage.selectContact(1);
    detailpage.selectEditButton();
    detailpage.clearForm();
    detailpage.fillOutForm({
      firstName: contactEdit.firstName,
      lastName: contactEdit.lastName,
      email: contactEdit.email
    });

    //Make the browser fall asleep for a second
    detailpage.submitForm();
  });

  it('Should add contact', () => {
    homepage.addButton.click();
    detailpage.fillOutForm({firstName: contactAdd.firstName, lastName: contactAdd.lastName, email: contactAdd.email});
    detailpage.validateFormInput(contactAdd.firstName, contactAdd.lastName, contactAdd.email);
    detailpage.submitForm();
    expect(detailpage.form.isPresent()).toBeFalsy();
    expect<any>(homepage.contactsList.count()).toEqual(6)
  })

});
