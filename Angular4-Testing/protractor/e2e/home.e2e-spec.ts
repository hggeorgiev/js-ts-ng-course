import { browser, element, by } from 'protractor'
import {HomePageObject} from './pageObjects/home.pageObject'

describe('Home page', () => {

    var homepage = new HomePageObject();

    beforeAll(() => { // beforeEach
        browser.get('#');
    })

    it('should have copyright', () => {
        expect(homepage.getCopyrightText()).toEqual('© Copyright ITCE & Pracxs 2016')
    })
    
    it('should have add button', () => {
        expect(homepage.addButton).toBeDefined()
        expect(homepage.addButton).not.toBeNull()
    })
    
    it('showld have 5 contacts in the list', () => {
        expect(homepage.contactsList.count()).toEqual(5)
    })

    it('showld have Max SMITH in the list', () => {
        expect(homepage.contactsList.first().getText()).toEqual('Max SMITH')
    })
});
