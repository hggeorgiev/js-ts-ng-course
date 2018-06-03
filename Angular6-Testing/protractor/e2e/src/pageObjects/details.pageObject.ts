import {browser, element, by} from 'protractor';

interface FormFields {
    firstName:string,
    lastName:string,
    email:string
}
export class DetailsPageObject {
    public contactsDetail = element(by.id('contactsDetailsContainer'));
    public editButton = element(by.id('edit-btn'));

    public firstNameField = element(by.name('firstName'));
    public lastNameField = element(by.name('lastName'));
    public emailField = element(by.name('email'));
    public formSubmitButton = element(by.css("input[type='submit']"));

    validateSelectedUser(firstName: string, lastName: string, email: string) {
        let txt = this.contactsDetail.getText()
        expect(txt).toEqual(jasmine.stringMatching(firstName))
        expect(txt).toEqual(jasmine.stringMatching(lastName))
        expect(txt).toEqual(jasmine.stringMatching(email))
    }

    selectEditButton() {
        this.editButton.click();
    }

    clearForm() {
        this.firstNameField.clear();
        this.lastNameField.clear();
        this.emailField.clear();
    }

    fillOutForm(fields:FormFields) {

        this.firstNameField.sendKeys(fields.firstName);
        this.lastNameField.sendKeys(fields.lastName);
        this.emailField.sendKeys(fields.email);

    }

    submitForm() {
        this.formSubmitButton.click();
    }




    /////

    // typeInName(name: string) {
    //     this.name.clear();
    //     this.name.sendKeys(name);
    //     this.hiButton.click();
    // }
}
