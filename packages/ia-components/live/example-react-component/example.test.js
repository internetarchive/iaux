import React from 'react'
import TestRenderer from 'react-test-renderer'
import assert from 'assert'

import { IAUXExampleComponent } from '../../index'

/**
 * Test for IAUXExampleComponent
 *
 * Using both `expect` (from Jest) & `assert`
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

  assert(component instanceof Object)
  assert.equal(testInstance.children.length, 1, 'number of children')
})
