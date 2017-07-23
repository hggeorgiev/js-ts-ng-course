import { browser, element, by } from 'protractor';

export class DetailsPageObject {
    public contactsDetail = element(by.id('contactsDetailsContainer'))
    
    validateSelectedUser(firstName: string, lastName: string, email: string) {
        let txt = this.contactsDetail.getText()
        expect(txt).toEqual(jasmine.stringMatching(firstName))
        expect(txt).toEqual(jasmine.stringMatching(lastName))
        expect(txt).toEqual(jasmine.stringMatching(email))
    }
}
