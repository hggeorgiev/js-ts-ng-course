import { browser, by, element } from "protractor";

describe('Deleting a contact', () => {
  const list = element(by.tagName('contacts-list')).all(by.tagName('li'));

  it('Should delete a contact', () => {
    const listItem = list.get(1);
    browser.actions().mouseMove(listItem).perform();
    listItem.element(by.className('remove')).click();
    expect(list.count()).toEqual(5);
  });

});
