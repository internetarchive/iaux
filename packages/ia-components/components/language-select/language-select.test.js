import React from 'react';
import TestRenderer from 'react-test-renderer';
import LanguageSelect from './language-select';
import languageConfig from './languageConfig';

describe('LanguageSelect', () => {
  const onSelect = (value) => {
    const language = languageConfig[value];
    console.log(`Selected language: ${language.inLocal} (${value})`);
  };

  const component = TestRenderer.create(
    <LanguageSelect selectedLanguage="en" languages={languageConfig} onSelect={onSelect} />
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
