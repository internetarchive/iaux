import React from 'react';
import { storiesOf } from '@storybook/react';
import LanguageSelect from './language-select';

const containerStyle = {
  padding: '20px 0',
  textAlign: 'center',
  background: '#333',
};

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

storiesOf('Sandbox', module)
  .addParameters({ jest: ['language-select.test.js'] })
  .addWithJSX('Language Select', () => {
    return (<div style={containerStyle}>
      <h3 style={{ color: '#fff' }}>Language dropdown</h3>
      <LanguageSelect selectedLanguage={options[0].value} options={options} onSelect={onSelect} />
    </div>);
  })

