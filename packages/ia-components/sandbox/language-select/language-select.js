import React from "react";
import PropTypes from "prop-types";
import CloseMenu from "./CloseMenu";
// Add new flag emoji here
const flags = {
  en: "🇬🇧",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  hi: "🇮🇳",
  id: "🇮🇩",
  it: "🇮🇹",
  ja: "🇯🇵",
  mr: "🇮🇳",
  my: "🇲🇲",
  pt: "🇵🇹",
};

/**
 * Renders the flag emoji and display name for a given language
 *
 * @param object props
 *   @param string name language display name
 *   @param string flag flag emoji
 *
 * @returns component stateless
 */
const LanguageNode = ({ name, flag }) => (
  <>
    <span className="flag">{flag}</span>
    {name}
  </>
);

/**
 * Renders a selectable language option in the languages dropdown
 *
 * @param object props
 *   @param object language language object
 *   @param string value language value
 *   @param string selectedLanguage selected language value
 *   @param function onClick click handler from LanguageSelect instance
 *
 * @returns component stateless
 */
const LanguageOption = ({ language, value, selectedLanguage, onClick }) => (
  <li className={selectedLanguage === value ? "selected" : null}>
    <a onClick={onClick} data-language={value}>
      <LanguageNode name={language.inLocal} flag={language.flag} />
    </a>
  </li>
);

/**
 * Presentational component
 * A dropdown to select a language. Clicking/tapping the dropdown trigger
 * opens a dropdown list of languages that render flag icons and the language
 * name written in its native language.
 *
 * @param object languages - object map of language values
 * input object example:
 * { 'en': { inEnglish: 'English', inLocal: 'English', flag: '🇬🇧' } }
 * @param function onSelect - event handler
 * @param string selectedLanguage - language that is selected
 *
 * @returns component
 */
class LanguageSelect extends React.Component {
  constructor(props) {
    const { languages, selectedLanguage, onSelect } = props;
    super(props);
    this.languages = languages;
    this.state = {
      selectedLanguage,
      dropdownOpen: false,
    };
    this.onSelect = onSelect;

    ["toggleDropdown", "selectLanguage"].forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  toggleDropdown(e) {
    if (e) e.preventDefault();
    const isOpened = !this.state.dropdownOpen;

    this.setState({ dropdownOpen: isOpened });
  }

  selectLanguage(e) {
    e.preventDefault();
    const selectedLanguage = e.target.dataset.language;

    this.setState({
      dropdownOpen: false,
      selectedLanguage,
    });
    this.onSelect(selectedLanguage);
  }

  render() {
    const { selectedLanguage, dropdownOpen } = this.state;
    const selectedOption =
      this.languages[selectedLanguage] ||
      this.languages[Object.keys(this.languages)[0]];

    return (
      <div className="language_select">
        <a onClick={this.toggleDropdown}>
          <LanguageNode
            name={selectedOption.inLocal}
            flag={selectedOption.flag}
          />
        </a>
        {dropdownOpen && (
          <ul className={dropdownOpen ? "visible" : null}>
            <CloseMenu handleOutside={this.toggleDropdown}>
              {Object.keys(this.languages).map(language => (
                <LanguageOption
                  key={`language_${language}`}
                  language={this.languages[language]}
                  value={language}
                  selectedLanguage={selectedLanguage}
                  onClick={this.selectLanguage}
                />
              ))}
            </CloseMenu>
          </ul>
        )}
      </div>
    );
  }
}

LanguageSelect.defaultProps = {
  selectedLanguage: "",
};

LanguageSelect.propTypes = {
  languages: PropTypes.objectOf(
    PropTypes.shape({
      inEnglish: PropTypes.string,
      inLocal: PropTypes.string,
      flag: PropTypes.string,
    }),
  ).isRequired,
  selectedLanguage: PropTypes.string,
  onSelect: PropTypes.func,
};

export default LanguageSelect;
