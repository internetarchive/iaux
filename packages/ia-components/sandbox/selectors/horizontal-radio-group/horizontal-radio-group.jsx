import React from 'react';
import PropTypes from 'prop-types';

/**
 * Presentational component
 * A group of buttons where only 1 can be chosen,
 * Horizontal pill design
 *
 * @param [] options - array of objects to select from
 * input object example:
 * { value: {string}, label: {string|HTML} }
 * @param string name - name of radio group to ensure only 1 can be toggle-able
 * @param function onChange - event handler
 * @param string selectedValue - actual value that is selected
 * @param string wrapperStyle - custom wrapper css class
 *
 * @returns component
 */

const HorizontalRadioGroup = ({
  options, name, onChange, selectedValue, wrapperStyle
}) => {
  const formattedInputs = options.map((input, index) => {
    const {
      value, label, displayAsIs, asIsDisplay, clickTrackValue = null
    } = input;
    const uniqueKey = `name-${index}`;
    const isSelected = selectedValue === value;
    const optionClassName = `option ${isSelected ? 'selected' : ''}`;

    const clickTrackDataAttr = {};

    if (clickTrackValue) {
      clickTrackDataAttr['data-event-click-tracking'] = clickTrackValue;
    }

    if (displayAsIs) {
      return (
        <div key={uniqueKey} className={optionClassName}>
          { asIsDisplay }
        </div>
      );
    }

    return (
      <div key={uniqueKey} className={optionClassName}>
        <input
          type="radio"
          name={name}
          id={`${name}-${value}`}
          value={value}
          onChange={onChange}
          checked={isSelected ? 'checked' : ''}
        />
        <label htmlFor={`${name}-${value}`} {...clickTrackDataAttr}>
          <span>{label}</span>
        </label>
      </div>
    );
  });
  return (
    <div className={`selector__radio-group ${wrapperStyle}`}>
      { formattedInputs }
    </div>
  );
};

HorizontalRadioGroup.defaultProps = {
  selectedValue: '',
  wrapperStyle: ''
};

HorizontalRadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.object /* object = React element */
    ]),
    clickTrackValue: PropTypes.string,
  })).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
  wrapperStyle: PropTypes.string,
};

export default HorizontalRadioGroup;
