import React from 'react';
import LanguageSelect from './language-select';
import languageConfig from './languageConfig';

const containerStyle = {
  padding: '20px 0',
  textAlign: 'center',
  background: '#333',
};

const onSelect = (value) => {
  const language = languageConfig[value];
  console.log(`Selected language: ${language.inLocal} (${value})`);
};

export default {
  title: 'Components',
  component: LanguageSelect,

};

export const LanguageSelectorDropdown = () => (
  <div style={containerStyle}>
    <h3 style={{ color: '#fff' }}>Language dropdown</h3>
    <LanguageSelect selectedLanguage="en" languages={languageConfig} onSelect={onSelect} />
  </div>
);
