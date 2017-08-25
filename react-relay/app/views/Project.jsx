import React, { PropTypes } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

class Project extends React.Component {
  static propTypes = {
    project: PropTypes.object.isRequired
  }

  render() {
    const { project } = this.props

    return (
      <span>
        {project.name}
      </span>
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
