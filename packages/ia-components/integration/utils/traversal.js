import { Builder, By, until } from 'selenium-webdriver';
/*
 * Creates scoped helper methods to more succinctly traverse the DOM
 * @param {object} driver - The Selenium Webdriver instance
 */
export default (driver) => {
  const to = (selector) => driver.findElement(By.css(selector));
  const asyncTo = (selector) => driver.wait(until.elementLocated(By.css(selector)));

  const toFrame = (frame) => driver.switchTo().frame(frame);

  const toParentFrame = () => driver.switchTo().defaultContent();

  return { to, asyncTo, toFrame, toParentFrame };
}
