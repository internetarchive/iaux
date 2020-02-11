import React from 'react';
import { storiesOf } from '@storybook/react';
import LanguageSelect from './language-select';

const languageConfig = { // Note the flags are dragged out of the Mac Emoji and Symbol viewer
  en: { inEnglish: 'English', inLocal: 'English', flag: '🇬🇧' },
  fr: { inEnglish: 'French', inLocal: 'Française', flag: '🇫🇷' },
  de: { inEnglish: 'German', inLocal: 'Deutsche ', flag: '🇩🇪' },
  es: { inEnglish: 'Spanish', inLocal: 'Española', flag: '🇪🇸' },
  hi: { inEnglish: 'Hindi', inLocal: 'हिंदी', flag: '🇮🇳' },
  id: { inEnglish: 'Indonesian', inLocal: 'Bahasa', flag: '🇮🇩' },
  it: { inEnglish: 'Italian', inLocal: 'Italiana', flag: '🇮🇹' },
  ja: { inEnglish: 'Japanese', inLocal: '日本語', flag: '🇯🇵' },
  mr: { inEnglish: 'Marathi', inLocal: 'मराठी', flag: '🇮🇳' },
  my: { inEnglish: 'Myanmar', inLocal: 'မြန်မာ', flag: '🇲🇲' },
  pt: { inEnglish: 'Portugese', inLocal: 'Portuguesa', flag: '🇵🇹' },
};

const containerStyle = {
  padding: '20px 0',
  textAlign: 'center',
  background: '#333',
};

const onSelect = (value) => {
  const language = languageConfig[value];
  console.log(`Selected language: ${language.inLocal} (${value})`);
};

storiesOf('Sandbox', module)
  .addParameters({ jest: ['language-select.test.js'] })
  .addWithJSX('Language Select', () => {
    return (<div style={containerStyle}>
      <h3 style={{ color: '#fff' }}>Language dropdown</h3>
      <LanguageSelect selectedLanguage='en' languages={languageConfig} onSelect={onSelect} />
    </div>);
  })

