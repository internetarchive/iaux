import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import driverTraversalDecorator from './utils/traversal';

const URL = 'http://localhost:9001/?selectedKind=Theatres&selectedStory=Audio%20with%20YouTube%2C%20Spotify&full=0&addons=1&stories=1&panelRight=0&addonPanel=%40storybook%2Faddon-a11y%2Fpanel';

const selectors = {
  frame: '#storybook-preview-iframe',
  theater_container: '.theatre__wrap',
  cover_image: '.background-photo',
  track1_button: '.audio-track-list button[data-track-number="1"]',
  track_no: '.track-number',
  track_name: '.track-title',
  track_duration: '.track-length',
  liner_notes: '#IABookReaderWrapper'
};

describe('Audio Player', () => {
  let driver;

  let to;
  let asyncTo;
  let toFrame;
  let toParentFrame;

  beforeAll(async () => {
    driver = new Builder()
      .forBrowser('chrome')
      .build();
    const methods = driverTraversalDecorator(driver);
    to = methods.to;
    asyncTo = methods.asyncTo;
    toFrame = methods.toFrame;
    toParentFrame = methods.toParentFrame;
  });

  afterAll(() => {
    driver.quit();
  });

  it('renders the component', async () => {
    await driver.get(URL);
    const player_frame = await asyncTo(selectors.frame);
    toFrame(player_frame);

    const theater_container = await asyncTo(selectors.theater_container);
    const theater_visible = await theater_container.isDisplayed();

    toParentFrame();

    return expect(theater_visible).toBe(true);
  });

  it('renders an album cover', async () => {
    const player_frame = to(selectors.frame);
    toFrame(player_frame);

    const cover_image = await asyncTo(selectors.cover_image);
    const image_src = await cover_image.getAttribute('src');

    toParentFrame();

    return expect(image_src).toMatch(/archive\.org/);
  });

  it('renders a track', async () => {
    const player_frame = to(selectors.frame);
    toFrame(player_frame);

    const track_button = await asyncTo(selectors.track1_button);
    const is_selected = await track_button.getAttribute('class');
    const track_no_el = await track_button.findElement(By.css(selectors.track_no));
    const track_name_el = await track_button.findElement(By.css(selectors.track_name));
    const track_duration_el = await track_button.findElement(By.css(selectors.track_duration));
    const track_no = await track_no_el.getText();
    const track_name = await track_name_el.getText();
    const track_duration = await track_duration_el.getText();

    toParentFrame();

    expect(is_selected).toMatch(/selected/);
    expect(track_no).toBe("1");
    expect(track_name).toBe("Night Life");
    return expect(track_duration).toBe("00:30");
  });

  it('renders BookReader for liner notes tab', async () => {
    const player_frame = to(selectors.frame);
    toFrame(player_frame);

    // This selector is much too brittle. Propose adding an ID to the input.
    const liner_notes_input = await asyncTo('[value="liner-notes"]');
    const liner_notes_label = await liner_notes_input.findElement(By.xpath('./following-sibling::label'));
    await driver.wait(until.elementIsVisible(liner_notes_label)).click();
    const book_reader_exists = await to(selectors.liner_notes).isDisplayed();

    toParentFrame();

    return expect(book_reader_exists).toBe(true);
  });
});
