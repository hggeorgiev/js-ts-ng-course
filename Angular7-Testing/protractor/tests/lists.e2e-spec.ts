import { browser, by, element } from "protractor";

describe('Removing from a list', () => {

  const list = element(by.tagName('contacts-list')).all(by.tagName('li'));

  beforeAll(() => {
    browser.get('#')
  });

  it('Should contain 5 elements', () => {
    expect(list.count()).toEqual(5);
  });

  it('Should have Gordon FREEMAN in the list', () => {
    const firstItem = list.first();
    expect<any>(firstItem.getText()).toEqual('Gordon FREEMAN')
  });

  it('Should  delete first item', () => {
    const firstItem = list.first();
    // Hover over the item to make it visible
    browser.actions().mouseMove(firstItem).perform();
    firstItem.element(by.className('remove')).click();
    expect(list.count()).toEqual(4);
  });
});