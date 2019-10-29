import React from 'react';
import TestRenderer from 'react-test-renderer';

// Moved this to a local import rather than via index because depends on experimental extension
import IAUXExampleComponent from './index';

/**
 * Test for IAUXExampleComponent
 *
 * Using `expect` (from Jest)
 */
test('IAUXExampleComponent draws', () => {
  const component = TestRenderer.create(
    <IAUXExampleComponent>
      <p>Hello this is a test</p>
    </IAUXExampleComponent>
  )
  const tree = component.toJSON()
  const testInstance = component.root

  expect(tree).toMatchSnapshot()
  expect(testInstance.children.length).toEqual(1)

  expect(component instanceof Object)
});
