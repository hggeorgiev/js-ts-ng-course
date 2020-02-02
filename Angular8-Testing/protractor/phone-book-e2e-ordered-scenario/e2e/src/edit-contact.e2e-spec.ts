import { browser, by, element, protractor } from "protractor";

describe('Editing a contact', () => {
  const list = element(by.tagName('contacts-list')).all(by.tagName('li'));

  it('Should select Alyx VANCE', () => {
    list.get(1).element(by.tagName('a')).click();
    const details = element(by.id('contactsDetailsContainer'));
    let txt       = details.getText();
    // Needs https://github.com/JamieMason/Jasmine-Matchers installed to work properly
    expect(txt).toEqual(jasmine.stringMatching('Alyx'));
    expect(txt).toEqual(jasmine.stringMatching('Vance'));
    expect(txt).toEqual(jasmine.stringMatching('alyx@resistance.com'));
  });

  it('Should display a form contact', () => {
    list.get(1).element(by.tagName('a')).click();
    const editBtn = element(by.id('edit-btn'));
    editBtn.click();

    const form = element(by.tagName('form'));

    expect(form.isPresent()).toBeTruthy();
  });
  
  it('Should edit contact', () => {
    const form = element(by.tagName('form'));
    expect(form.getAttribute('class')).toContain('ng-valid');
  });

  it('Should edit first name', () => {
    const firstNameField = element(by.name('firstName'));
    firstNameField.clear();
    firstNameField.sendKeys('Java');
    expect(firstNameField.getAttribute('value')).toEqual('Java')
  });

  it('Should edit last name', () => {
    const lastNameField  = element(by.name('lastName'));
    lastNameField.clear();
    lastNameField.sendKeys('Jarawal');
    expect(lastNameField.getAttribute('value')).toEqual('Jarawal')
  });

  it('Should edit email', () => {
    const emailField     = element(by.name('email'));
    emailField.clear();
    emailField.sendKeys('java@paysafe.com');
    expect(emailField.getAttribute('value')).toEqual('java@paysafe.com')
  });

  it('Should save contact successfully', () => {
    const form = element(by.tagName('form'));
    const formSubmitButton = element(by.css("input[type='submit']"));
    formSubmitButton.click();
    expect(form.isPresent()).toBeFalsy();
  });
  
  
  it('Contact should have different information', () => {
    list.get(1).element(by.tagName('a')).click();
    const detailsPage = element(by.id('contactsDetailsContainer'));
    expect(detailsPage.getText()).toContain('java@paysafe.com')
  })
});


