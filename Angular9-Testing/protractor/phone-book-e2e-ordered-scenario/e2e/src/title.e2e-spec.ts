import { browser } from "protractor";

describe('Simple test', () => {
  it('Should have a title', () => {
    browser.get('#');
    expect(browser.getTitle()).toEqual('Angular Training App');
  });
});
