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
})