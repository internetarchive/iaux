import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
// Uncomment to use Firefox (note that Firefox is more flaky):
// import firefox from 'selenium-webdriver/firefox';

// Example config to use BrowserStack
//
// const capabilities = {
//   'browserName' : 'Firefox',
//   'browser_version' : '67.0 beta',
//   'os' : 'OS X',
//   'os_version' : 'Mojave',
//   'resolution' : '1024x768',
//   'browserstack.user' : 'internetarchive1',
//   'browserstack.key' : 'REPLACE_WITH_KEY',
//   'name' : 'Sample Test'
// }
// var driver = new webdriver.Builder()
//   .usingServer('http://hub-cloud.browserstack.com/wd/hub')
//   .withCapabilities(capabilities)
//   .build();

describe('Example: Test search engine', () => {
  let driver;

  beforeAll(async () => {
    // For Firefox, change "chrome" to "firefox" and "Chrome" to "Firefox"
    // everywhere below
    const options = new chrome.Options();

    // Uncomment to go headless:
    // options.headless();

    driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('we can access Google', async () => {
    await driver.get('http://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('BrowserStack');

    // Because the Search button only appears later and needs to be scrolled to,
    // we first locate the button, then wait until it's visible.
    // NOTE: `elementIsVisible()` takes an element, not a locator.
    const button = await driver.wait(until.elementLocated(By.name('btnK')));
    await driver.wait(until.elementIsVisible(button)).click();


    // const targetElement = await driver.findElement(By.tagName('html'));

    // console.log('targetElement', targetElement);

    const resultElement = await driver.findElement(By.css('div[data-async-context="query:browserstack"]'));
    const urlElement = await resultElement.findElement(By.css('link[rel="prerender"]'));
    console.log('urlElement', urlElement);

    const elementText = await urlElement.getText();
    return expect(elementText).toEqual('browserstack.com');
  });
});
