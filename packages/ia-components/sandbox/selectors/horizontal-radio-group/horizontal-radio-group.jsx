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
    const { value, label, displayAsIs, asIsDisplay } = input;
    const uniqueKey = `name-${index}`;

    if (displayAsIs) {
      return (
        <div key={uniqueKey} className="option">
          { asIsDisplay }
        </div>
      );
    }

    return (
      <div key={uniqueKey} className="option">
        <label>
          <input
            type="radio"
            name={name}
            value={value}
            onChange={onChange}
            checked={selectedValue === value ? 'checked' : ''}
          />
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
    ])
  })).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
  wrapperStyle: PropTypes.string
};

export default HorizontalRadioGroup;
