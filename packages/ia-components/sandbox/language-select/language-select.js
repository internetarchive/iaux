import React from 'react';
import PropTypes from 'prop-types';

// Add new flag emoji here
const flags = {
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  hi: '🇮🇳',
  id: '🇮🇩',
  it: '🇮🇹',
  ja: '🇯🇵',
  mr: '🇮🇳',
  my: '🇲🇲',
  pt: '🇵🇹',
};

/**
 * Renders the flag emoji and display name for a given language
 *
 * @param object props
 *   @param string name language display name
 *   @param string value language value
 *
 * @returns component stateless
 */
const LanguageNode = ({ name, value }) => (
  <>
    <span className='flag'>{flags[value]}</span>
    {name}
  </>
);

/**
 * Renders a selectable language option in the languages dropdown
 *
 * @param object props
 *   @param string name language display name
 *   @param string value language value
 *   @param string selectedLanguage selected language value
 *   @param function onClick click handler from LanguageSelect instance
 *
 * @returns component stateless
 */
const LanguageOption = ({ name, value, selectedLanguage, onClick }) => (
  <li className={selectedLanguage === value ? 'selected' : null}>
    <a onClick={onClick} data-language={value}>
      <LanguageNode name={name} value={value} />
    </a>
  </li>
);


/**
 * Presentational component
 * A dropdown to select a language. Clicking/tapping the dropdown trigger
 * opens a dropdown list of languages that render flag icons and the language
 * name written in its native language.
 *
 * @param array options - array of objects to select from
 * input object example:
 * { value: 'en', label: 'English' }
 * @param function onSelect - event handler
 * @param string selectedLanguage - language that is selected
 *
 * @returns component
 */
class LanguageSelect extends React.Component {
  constructor(props) {
    const { options, selectedLanguage, onSelect } = props;
    super(props);
    this.options = options;
    this.state = {
      selectedLanguage,
      dropdownOpen: false,
    };
    this.onSelect = onSelect;

    ['toggleDropdown', 'selectLanguage'].forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  toggleDropdown(e) {
    e.preventDefault();
    const isOpened = !this.state.dropdownOpen;

    this.setState({ dropdownOpen: isOpened });
  }

  selectLanguage(e) {
    e.preventDefault();
    const languageValue = e.target.dataset.language;

    this.setState({
      dropdownOpen: false,
      selectedLanguage: this.options.find((o) => o.value === languageValue).value,
    });
    this.onSelect(languageValue);
  }

  render() {
    const { selectedLanguage, dropdownOpen } = this.state;
    const selectedOption = this.options.find((o) => o.value === selectedLanguage);
    const selectedLabel = selectedOption ? selectedOption.name : this.options[0].name;

    return (
      <div className='language_select'>
        <a onClick={this.toggleDropdown}>
          <LanguageNode name={selectedLabel} value={selectedLanguage} />
        </a>
        <ul className={dropdownOpen ? 'visible' : null}>
          {this.options.map((o) => (
            <LanguageOption
               key={`language_${o.value}`}
               name={o.name}
               value={o.value}
               selectedLanguage={selectedLanguage}
               onClick={this.selectLanguage} />))}
        </ul>
      </div>
    );
  }
}

LanguageSelect.defaultProps = {
  selectedLanguage: '',
};

LanguageSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  selectedLanguage: PropTypes.string,
  onSelect: PropTypes.func,
};

export default LanguageSelect;
