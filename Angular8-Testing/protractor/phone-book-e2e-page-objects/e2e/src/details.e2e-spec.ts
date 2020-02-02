import { browser } from 'protractor'
import { HomePageObject } from './page-objects/home.pageObject'
import { DetailsPageObject } from './page-objects/details.pageObject'
import { contactAdd, contactEdit } from "./mock-data/contacts";

describe('Details page', () => {

  let homepage   = new HomePageObject()
  let detailpage = new DetailsPageObject()

  beforeEach(() => {
    browser.get('#')
  });

  it('should select Alyx VANCE', () => {
    homepage.selectContact(1)
    detailpage.validateSelectedUser('Alyx', 'Vance', 'alyx@resistance.com');
  });

  it('should edit a contact', () => {
    homepage.selectContact(1);
    detailpage.selectEditButton();
    detailpage.clearForm();
    detailpage.fillOutForm({firstName: contactEdit.firstName, lastName: contactEdit.lastName, email: contactEdit.email});

    //Make the browser fall asleep for a second
    browser.driver.sleep(1000);
    detailpage.submitForm();
    browser.driver.sleep(1000);
  });

  it('should add contact', () => {
    homepage.addButton.click();
    detailpage.fillOutForm({firstName: contactAdd.firstName, lastName: contactAdd.lastName, email: contactAdd.email});
    browser.driver.sleep(1000);
    detailpage.submitForm();
    browser.driver.sleep(1000);
    expect<any>(homepage.contactsList.count()).toEqual(6)


  })


});
