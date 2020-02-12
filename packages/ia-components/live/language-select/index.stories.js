import React from 'react';
import { storiesOf } from '@storybook/react';
import { languageConfig } from '../languages/Languages';
import LanguageSelect from './language-select';

const containerStyle = {
  padding: '20px 0',
  textAlign: 'center',
  background: '#333',
};

const onSelect = (value) => {
  const language = languageConfig[value];
  console.log(`Selected language: ${language.inLocal} (${value})`);
};

storiesOf('live', module)
  .addParameters({ jest: ['language-select.test.js'] })
  .addWithJSX('Language Select', () => {
    return (<div style={containerStyle}>
      <h3 style={{ color: '#fff' }}>Language dropdown</h3>
      <LanguageSelect selectedLanguage='en' languages={languageConfig} onSelect={onSelect} />
    </div>);
  })

