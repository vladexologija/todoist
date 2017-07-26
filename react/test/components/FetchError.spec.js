import React from 'react';
import TestUtils from 'react-addons-test-utils';
import FetchError from 'components/FetchError';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<FetchError {...props} />);
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<FetchError {...props} />);
}

describe('(Component) FetchError', () => {
  let _component, _props;

  beforeEach(()=>{
    _props = {
      message: 'Error message',
      onRetry: function() {}
    }

    _component = shallowRenderWithProps(_props);
  })

  it('should render the correct message', () => {
    const expected = (
      <p>Could not fetch todos. Error message</p>
    )
    expect(_component).toIncludeJSX(expected)
  })

  it('should render the enclosing div', () => {
    const expected = 'div';
    expect(_component.type).toEqual(expected)
  })

  it('should render the correct class', () => {
    const expected = true;
    const actual = _component.props.className.includes('fetch-error')
    expect(actual).toEqual(expected)
  })

})
