import React from 'react';
import TestRenderer from 'react-test-renderer';

import HorizontalRadioGroup from './horizontal-radio-group';


/* Test for HorizontalRadioGroup
*/
describe('HorizontalRadioGroup', () => {
  const options = [
    { label: 'label 1', value: 'value 1' },
    { label: 'label 2', value: 'value 2' }
  ];
  const component = TestRenderer.create(
    <HorizontalRadioGroup
      options={options}
      name="test-selectors"
      selectedValue="value 2"
      onChange={() => {}}
    />
  );
  const tree = component.toJSON();

  test('displays all options', () => {
    expect(tree).toMatchSnapshot();
    expect(tree.children.length).toEqual(options.length);
  });

  test('defaults to rounded styling', () => {
    expect(tree.props.className).toContain('rounded');
  });
});
