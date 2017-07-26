import React from 'react'
import 'ignore-styles'
import { shallow } from 'enzyme'
import Projects from '../components/Projects'

console.log(process.env.NODE_ENV)

test('Project renders correctly', () => {
  const props = {}

  const component = shallow(<Projects {...props} />)
  // is it same as snap in __snapshot__ folder
  expect(component).toMatchSnapshot()
})

test('Project should render correct number of projects', () => {
  const props = {
    projects: [
      {
        id: 1,
        name: 'testProject'
      }
    ]
  }

  const component = shallow(<Projects {...props} />)
  expect(props.projects.length).toEqual(component.items.length)
})

test('Project should render correct number of projects filtered', () => {
  const props = {
    projects: [
      {
        id: 1,
        name: 'testProject',
        completed: true
      },
      {
        id: 2,
        name: 'testProject',
        completed: false
      }
    ]
  }

  const component = shallow(<Projects {...props} />)
  component.find('input').simulate('change', { target: { value: 'completed' } })
  expect(props.projects.length).toEqual(1)
})
