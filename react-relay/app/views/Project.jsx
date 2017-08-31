import React, { PropTypes } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

import EditProject from '../components/EditProject'
import renameProject from '../mutations/renameProject'
import removeProject from '../mutations/removeProject'

class Project extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      editing: false
    }
  }

  editName = name => {
    renameProject(this.props.project, name, this.props.viewer, this.activateEdit)
  }

  del = () => {
    removeProject(this.props.project, this.props.viewer, () => console.log('removeProject success'))
  }

  activateEdit = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  select = () => {
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    const { project } = this.props

    return (
      <EditProject
        className='project-name'
        selected={this.state.selected}
        editing={this.state.editing}
        value={project.name}
        onEdit={this.activateEdit}
        onUpdate={this.editName}
        onClick={this.select}
        onDelete={this.del}
      />
    )
  }
}

export default createFragmentContainer(
  Project,
  graphql`
    fragment Project_project on project {
      id
      name
    }
  `
)
