import React from 'react';
import TestRenderer from 'react-test-renderer';
import LanguageSelect from './language-select';

describe('LanguageSelect', () => {
  const options = [{
    name: 'English',
    value: 'en',
  }, {
    name: 'Française',
    value: 'fr',
  }, {
    name: 'Deutsche',
    value: 'de',
  }, {
    name: 'Española',
    value: 'es',
  }, {
    name: 'हिंदी',
    value: 'hi',
  }, {
    name: 'Bahasa',
    value: 'id',
  }, {
    name: 'Italiana',
    value: 'it',
  }, {
    name: '日本語',
    value: 'ja',
  }, {
    name: 'मराठी',
    value: 'mr',
  }, {
    name: 'မြန်မာ',
    value: 'my',
  }, {
    name: 'Portuguesa',
    value: 'pt',
  }];

  const onSelect = (value) => {
    const language = options.find((o) => o.value === value);
    console.log(`Selected language: ${language.name} (${language.value})`);
  };

  const component = TestRenderer.create(
    <LanguageSelect selectedLanguage={options[0].value} options={options} onSelect={onSelect} />
  );

  test('displays all options', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('expands dropdown when trigger clicked', () => {
    const event = new Event('click');
    component.getInstance().toggleDropdown(event);

    const tree = component.toJSON();
    expect(component.getInstance().state.dropdownOpen).toBe(true);
    expect(tree).toMatchSnapshot();
  });

  test('sets selectedLanguage when language clicked', () => {
    const french = 'fr';
    const event = {
      type: 'click',
      target: document.createElement('b'),
      preventDefault: () => {},
    };
    event.target.dataset.language = french;
    component.getInstance().selectLanguage(event);

    const tree = component.toJSON();
    expect(component.getInstance().state.selectedLanguage).toBe(french);
    expect(tree).toMatchSnapshot();
  });
});
