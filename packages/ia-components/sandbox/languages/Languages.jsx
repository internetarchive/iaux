/* global DwebArchive, DWebTransports */
import waterfall from 'async/waterfall';
import React from "react";
const debug = require('debug')('dweb-archive:languages');
const parallel = require('async/parallel'); //https://caolan.github.io/async/docs.html#parallel


/*
  Implements a first cut at internationalization (I18n) with language files in json, built by languagebuild.
  See dweb-archive/Nav.js/metaFactory() for an example of how to load up a language and fall back to English if not available
 */

const languages = { }

//SEE-OTHER-ADDLANGUAGE
const languageConfig = { // Note the flags are dragged out of the Mac Emoji and Symbol viewer
  'en': { inEnglish: 'English', inLocal: 'English', flag: '🇬🇧' },
  'fr': { inEnglish: 'French',  inLocal: 'Française', flag: '🇫🇷' },
  'de': { inEnglish: 'German',  inLocal: 'Deutsche ', flag: '🇩🇪' },
  'es': { inEnglish: 'Spanish', inLocal: 'Española', flag: '🇪🇸' },
  'hi': { inEnglish: 'Hindi', inLocal: 'हिंदी', flag: '🇮🇳'},
  'id': { inEnglish: 'Indonesian', inLocal: 'Bahasa', flag: '🇮🇩'},
  'it': { inEnglish: 'Italian', inLocal: 'Italiana', flag: '🇮🇹'},
  'ja': { inEnglish: 'Japanese', inLocal: '日本語', flag: '🇯🇵'},
  'mr': { inEnglish: 'Marathi', inLocal: 'मराठी', flag: '🇮🇳' },
  'my': { inEnglish: 'Myanmar', inLocal: 'မြန်မာ', flag: '🇲🇲' },
  'pt': { inEnglish: 'Portugese', inLocal: 'Portuguesa', flag: '🇵🇹'},
}
if (!currentISO()) currentISO("en");

function getLanguage(lang, cb) {
  if (!languageConfig[lang]) { cb(new Error('Do not support language: '+lang));
  } else {
    const url = ['/languages', languageConfig[lang].inEnglish.toLowerCase() + ".json"].join('/');
    DwebTransports.httptools.p_GET(url, {}, (err, languageObj) => {
      if (!err) languages[lang] = languageObj;
      cb(err);
    });
  }
}
function setLanguage(lang) {
  const olditem = DwebArchive.page.state.item; // Should be an item, not a message

  // Fetch the language file, and while doing so tell the user we are doing so in english and new languages
  DwebArchive.page.setState({message: <I18nSpan en="Changing language from"> {languageConfig[currentISO()].inEnglish}</I18nSpan>});
  waterfall([
    cb => {
      if (languages[lang]) {
        setTimeout(cb, 300);
      } else {
        DwebArchive.page.setState({message: <I18nSpan en="Fetching language file for"> {languageConfig[lang].inEnglish}</I18nSpan>});
        getLanguage(lang, cb);
      }
    },
    cb => {
      DwebArchive.page.setState({message: <I18nSpan en="Changing language to"> {languageConfig[lang].inEnglish}</I18nSpan>});
      setTimeout(cb, 300);
    },
    cb => {
      currentISO(lang);
      DwebArchive.page.setState({message: <I18nSpan en="Changing language to">{languageConfig[lang].inLocal}</I18nSpan>});
      cb(); // No delay here as will also delay after err message
    },
  ], (err) => {
      if (err) {
        // If fails, tell them
        currentISO("en");
        DwebArchive.page.setState({message: <I18nSpan en="Failed to set language to">{languageConfig[lang].inEnglish}</I18nSpan>});
      }
      // In both cases wait a short while then redisplay old page
      setTimeout(() => DwebArchive.page.setState({item: olditem, message: undefined}),1000);
    });
}
function currentISO(iso=undefined) {
  // Note where we store this might change, so use this if want to set or get the code
  if (iso) {
    global.language = iso;
  }
  return global.language;
}
function I18n(messageEnglish) {
  let l = currentISO();
  let s = languages[currentISO()][messageEnglish];
  if (!s) {
    l = "en";
    s = languages.en[messageEnglish];
    debug("%s missing %s", currentISO(), messageEnglish);
    if (!s) {
      s = messageEnglish; // Render key, its probably right
      debug("en missing %s", messageEnglish);
    }
  }
  return {s, l};
}
function I18nStr(messageEnglish) {
  return I18n(messageEnglish)["s"];
}
class I18nSpan extends React.Component {
  /**
   * <I18nSpan en="Yes" ... />
   */
  render() {
      let {s, l} = I18n(this.props.en);
      const spanProps = ObjectFilter(this.props, (k,v)=> (k !== "en"));
      return <span lang={l} {...spanProps} >{s}{this.props.children}</span>
  }
}
class I18nIcon extends React.Component {
  /**
   * <I18nIcon
   *    className="iconochive-xxxx"
   *    style={}
   *    iconref=function to use as ref for icon - this is used in NavWebDiv to set a hideable element in the search
   *    en=ENSTRING
   *    xs=ENSTRING
   * >
   *    optional children of span (already translated) and sr-only
   * </I18nIcon>
   */
  render() {
    return <>
      <span className={this.props.className} style={this.props.style} ref={this.props.iconref} aria-hidden="true"/>
      <I18nSpan className="sr-only" en={this.props.en}>{this.props.children}</I18nSpan>
      {!this.props.xs ? null :
        <>
        &nbsp;
        <I18nSpan className="hidden-xs-span" en={this.props.xs}/>
        </>
      }
    </>
  }
}

export { languages, languageConfig, currentISO, getLanguage, I18nSpan, setLanguage, I18n, I18nStr, I18nIcon }