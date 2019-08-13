import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import driverTraversalDecorator from './utils/traversal';

const URL = 'http://localhost:9001/?selectedKind=Theatres&selectedStory=Audio%20with%20YouTube%2C%20Spotify&full=0&addons=1&stories=1&panelRight=0&addonPanel=%40storybook%2Faddon-a11y%2Fpanel';

describe('Audio Player', () => {
  let driver;

  let to, asyncTo, toFrame;

  beforeAll(async () => {
    driver = new Builder()
      .forBrowser('chrome')
      .build();
    const methods = driverTraversalDecorator(driver);
    to = methods.to;
    asyncTo = methods.asyncTo;
    toFrame = methods.toFrame;
  });

  afterAll(() => {
    driver.quit();
  });

  it('renders the component', async () => {
    await driver.get(URL);
    const player_frame = await asyncTo('#storybook-preview-iframe');
    toFrame(player_frame);

    const theater_container = await asyncTo('.theatre__wrap');
    const theater_visible = await theater_container.isDisplayed();

    expect(theater_visible).toBe(true);
  });
});
