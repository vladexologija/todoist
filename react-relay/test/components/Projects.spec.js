import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import Projects from 'components/Projects';
import expect from 'expect';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<Projects {...props} />);
}

describe('(Component) Projects', () => {
  let _component, _props, _spies;

  beforeEach(() => {
    _spies = {};
    _props = {
      projects: [{
        id: 1,
        name: 'testProject'
      }]
    };

    _component = shallowRenderWithProps(_props);
  });

  it('Should render as a <div>. with class projects', () => {
    expect(_component.type).toEqual('div');
    expect(_component.props.className).toEqual('projects');
  });

  it('Should render correct data', () => {
    const [ row ] = _component.props.children;

    expect(row.key).toEqual(_props.projects[0].id);
    expect(row.props.project).toEqual(_props.projects[0]);
  });

})
