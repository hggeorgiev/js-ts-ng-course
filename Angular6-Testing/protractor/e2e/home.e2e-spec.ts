import { browser, element, by } from 'protractor'
import {HomePageObject} from './pageObjects/home.pageObject'

describe('Home page', () => {

    let homepage = new HomePageObject();

    beforeAll(() => { // beforeEach
        browser.get('#');
    })

    it('should have copyright', () => {
        expect<any>(homepage.getCopyrightText()).toEqual('© Copyright ITCE & Centroida 2017')
    })
    
    it('should have add button', () => {
        expect(homepage.addButton).toBeDefined()
        expect(homepage.addButton).not.toBeNull()
    })
    
    it('should have 5 contacts in the list', () => {
        expect<any>(homepage.contactsList.count()).toEqual(5)
    })

    it('should have Max SMITH in the list', () => {
        expect<any>(homepage.contactsList.first().getText()).toEqual('Max SMITH')
    })
});
