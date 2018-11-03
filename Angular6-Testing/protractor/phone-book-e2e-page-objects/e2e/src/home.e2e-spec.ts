import { browser, element, by } from 'protractor'
import {HomePageObject} from './page-objects/home.pageObject'

describe('Home page', () => {

    let homepage = new HomePageObject();

    beforeAll(() => { // beforeEach
        browser.get('#');
    })

    it('Should have copyright', () => {
        expect<any>(homepage.getCopyrightText()).toEqual('© Copyright ITCE 2018')
    })

    it('Should have add button', () => {
        expect(homepage.addButton).toBeDefined()
        expect(homepage.addButton).not.toBeNull()
    })

    it('Should have 5 contacts in the list', () => {
        expect<any>(homepage.contactsList.count()).toEqual(5)
    })

    it('Should have Gordon FREEMAN in the list', () => {
        expect<any>(homepage.contactsList.first().getText()).toEqual('Gordon FREEMAN')
    })
});
