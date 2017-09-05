import React, { Component, PropTypes } from 'react'

import { QueryRenderer, graphql } from 'react-relay'
import environment from '../relay/environment'

import Navbar from '../components/Navbar'
import Items from '../components/Items'
import Projects from '../components/Projects'

import createProject from '../mutations/createProject'
import createItem from '../mutations/createItem'

import '../styles/app.css'

const AppQuery = graphql.experimental`
  query AppQuery($filter: String) {
    viewer {
      id
      ...Projects_viewer
      ...Items_viewer @arguments(filter: $filter)
    }
  }
`

class App extends Component {
  static propTypes = {
    match: PropTypes.object,
    params: PropTypes.string
  }

  addProject = viewer => {
    createProject(`new project${parseInt(Math.random() * 1000)}`, viewer, () => console.log('mutation success'))
  }

  addItem = viewer => {
    createItem(`new item${parseInt(Math.random() * 1000)}`, viewer, () => console.log('mutation success'))
  }

  render() {
    const filter = (this.props.match && this.props.match.params && this.props.match.params.filter) || 'all'

    return (
      <QueryRenderer
        environment={environment}
        query={AppQuery}
        variables={{
          filter
        }}
        render={({ error, props }) => {
          if (error) {
            return (
              <h1>
                {error}
              </h1>
            )
          } else if (props) {
            return (
              <div>
                <Navbar />
                <div className='holder container'>
                  <div className='row'>
                    <div className='col-md-4 sidebar'>
                      <Projects onAddProject={() => this.addProject(props.viewer)} viewer={props.viewer} />
                    </div>
                    <div className='col-md-8 content'>
                      <Items onAddItem={() => this.addItem(props.viewer)} viewer={props.viewer} />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          return <h1>Loading...</h1>
        }}
      />
    )
  }
}

export default App
