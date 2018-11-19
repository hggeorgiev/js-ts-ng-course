import { browser, ExpectedConditions } from "protractor";

export const isClickable = function (el) {
  // NOTE see https://stackoverflow.com/questions/30862405/element-is-not-clickable-at-point-protractor
  browser.wait(ExpectedConditions.elementToBeClickable(el), 1000);
  el.click();
  browser.waitForAngular();
};