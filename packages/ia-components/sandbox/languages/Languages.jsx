//SEE-OTHER-ADDLANGUAGE
import waterfall from 'async/waterfall';
import IAReactComponent from "../IAReactComponent";
import React from "react";
const debug = require('debug')('dweb-archive:languages');
import { ObjectFilter } from "../../util";
import {myanmar} from "./js/myanmar";
import {english} from "./js/english";
import {french} from "./js/french";
import {german} from "./js/german";
import {hindi} from "./js/hindi";
import {japanese} from "./js/japanese";
import {indonesian} from "./js/indonesian";
import {spanish} from "./js/spanish";
import {marathi} from "./js/marathi";
import {portugese} from "./js/portugese";

// If you add a language here also add in dweb-archive-styles.css
//SEE-OTHER-ADDLANGUAGE
const languages = {
  'en': english,
  'fr': french,
  'de': german,
  'es': spanish,
  'hi': hindi,
  'id': indonesian,
  'ja': japanese,
  'mr': marathi,
  'my': myanmar,
  'pt': portugese,
}
//SEE-OTHER-ADDLANGUAGE
const languageConfig = {
  'en': { inEnglish: 'English', inLocal: 'English' },
  'fr': { inEnglish: 'French',  inLocal: 'Française' },
  'de': { inEnglish: 'German',  inLocal: 'Deutsche ' },
  'es': { inEnglish: 'Spanish', inLocal: 'Española' },
  'hi': { inEnglish: 'Hindi', inLocal: 'हिंदी'},
  'id': { inEnglish: 'Indonesian', inLocal: 'Bahasa'},
  'ja': { inEnglish: 'Japanese', inLocal: '日本語'},
  'mr': { inEnglish: 'Marathi', inLocal: 'मराठी' },
  'my': { inEnglish: 'Myanmar', inLocal: 'မြန်မာ' },
  'pt': { inEnglish: 'Portugese', inLocal: 'Portuguesa'},
}
if (!currentISO()) currentISO("en");

function setLanguage(lang) {
  const olditem = DwebArchive.page.state.item; // Should be an item, not a message
  DwebArchive.page.setState({message: <I18nSpan en="Changing language from"> {languages[currentISO()]._LanguageInEnglish}</I18nSpan>});
  waterfall([
    cb => setTimeout(cb, 300),
    cb => {
      DwebArchive.page.setState({message: <I18nSpan en="Changing language to"> {languages[lang]._LanguageInEnglish}</I18nSpan>});
      setTimeout(cb, 300); },
    cb => {
      currentISO(lang);
      DwebArchive.page.setState({message: <I18nSpan en="Changing language to">{languages[lang]._LanguageInLocal}</I18nSpan>});
      setTimeout(cb, 300); }
  ],(err)=>{
    if (err) {
      debug("Unable to change language %O", err);
    } else {
      DwebArchive.page.setState({item: olditem, message: undefined})
    }
  });
  //document.body.classList.remove(...Object.keys(languages));
  //document.body.classList.add(lang);
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
class I18nSpan extends IAReactComponent {
  /**
   * <I18nSpan en="Yes" ... />
   */
  constructor(props) {
    super(props);
  }
  render() {
      let {s, l} = I18n(this.props.en);
      const spanProps = ObjectFilter(this.props, (k,v)=> (k !== "en"));
      return <span lang={l} {...spanProps} >{s}{this.props.children}</span>
  }
}
class I18nIcon extends IAReactComponent {
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

export { languages, languageConfig, currentISO, I18nSpan, setLanguage, I18n, I18nStr, I18nIcon }