import { by, element } from 'protractor';

interface FormFields {
  firstName: string,
  lastName: string,
  email: string
}

export class DetailsPageObject {
  public contactsDetail = element(by.id('contactsDetailsContainer'));
  public editButton     = element(by.id('edit-btn'));
  public form = element(by.tagName('form'));

  public firstNameField   = element(by.name('firstName'));
  public lastNameField    = element(by.name('lastName'));
  public emailField       = element(by.name('email'));
  public formSubmitButton = element(by.css("input[type='submit']"));

  validateSelectedUser(firstName: string, lastName: string, email: string) {
    expect(this.contactsDetail.getText()).toContain(firstName);
    expect(this.contactsDetail.getText()).toContain(lastName);
    expect(this.contactsDetail.getText()).toContain(email);
  }

  validateFormInput(firstName: string, lastName: string, email: string) {
    expect(this.firstNameField.getAttribute('value')).toEqual(firstName);
    expect(this.lastNameField.getAttribute('value')).toEqual(lastName);
    expect(this.emailField.getAttribute('value')).toEqual(email);
  }

  selectEditButton() {
    this.editButton.click();
  }

  clearForm() {
    this.firstNameField.clear();
    this.lastNameField.clear();
    this.emailField.clear();
  }

  fillOutForm(fields: FormFields) {

    this.firstNameField.sendKeys(fields.firstName);
    this.lastNameField.sendKeys(fields.lastName);
    this.emailField.sendKeys(fields.email);

  }

  submitForm() {
    this.formSubmitButton.click();
  }
}
