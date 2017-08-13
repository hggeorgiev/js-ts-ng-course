import { browser, element, by } from 'protractor'
import {HomePageObject} from './pageObjects/home.pageObject'
import {DetailsPageObject} from './pageObjects/details.pageObject'

describe('Details page', () => {

    let homepage = new HomePageObject()
    let detailpage = new DetailsPageObject()

    beforeEach(() => {
        browser.get('#')
    })

    it('should select Chris RACHES', () => {
        homepage.selectContact(1)
        detailpage.validateSelectedUser('Chris', 'Raches', 'chris@gmail.com');
    })

    it('should edit a contact', () => {
        homepage.selectContact(1);
        detailpage.selectEditButton();
        detailpage.clearForm();
        detailpage.fillOutForm({firstName: 'Java' , lastName: 'Jarawal' , email: 'java@paysafe.com'});

        //Make the browser fall asleep for a second
        browser.driver.sleep(1000);
        detailpage.submitForm();
        browser.driver.sleep(1000);


    });

    it('should add contact' , () => {
        homepage.addButton.click();
        detailpage.fillOutForm({firstName: 'Top' , lastName: 'Jarawal' , email: 'javatop@paysafe.com'});
        browser.driver.sleep(1000);
        detailpage.submitForm();
        browser.driver.sleep(1000);
        expect<any>(homepage.contactsList.count()).toEqual(6)


    })


});