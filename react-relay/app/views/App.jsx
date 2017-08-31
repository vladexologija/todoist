import React, { Component, PropTypes } from 'react'

import { QueryRenderer, graphql } from 'react-relay'
import environment from '../relay/environment'

import Navbar from '../components/Navbar'
import Items from '../components/Items'
import Projects from '../components/Projects'

import createProject from '../mutations/createProject'
import createItem from '../mutations/createItem'

import '../styles/app.css'

const AppQuery = graphql`
  query AppQuery {
    viewer {
      id
      ...Projects_viewer
      ...Items_viewer
    }
  }
`

class App extends Component {
  addProject = viewer => {
    createProject('new project1', viewer, () => console.log('mutation success'))
  }

  addItem = viewer => {
    createItem('new item', viewer, () => console.log('mutation success'))
  }

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={AppQuery}
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
