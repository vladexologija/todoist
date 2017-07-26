import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'
import EditField from '../components/EditField'
import DropdownButton from '../components/DropdownButton'
import { selectProject, updateProject, deleteProject } from '../actions/projects'
import ItemTypes from '../constants/itemTypes'
import style from '../styles/project.css'

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.project.id
    const sourceProps = monitor.getItem()
    const sourceId = sourceProps.id

    if (!targetProps.project.items.length) {
      targetProps.onAttachItem(targetId, sourceId)
    }
  }
}

@DropTarget(ItemTypes.ITEM, noteTarget, cnct => ({
  connectDropTarget: cnct.dropTarget()
}))
class Project extends React.Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    onSelectProject: PropTypes.func.isRequired,
    onUpdateProject: PropTypes.func.isRequired,
    onDeleteProject: PropTypes.func.isRequired
  }

  editName = name => {
    const projectId = this.props.project.id

    if (!name.trim()) {
      this.props.onUpdateProject({ id: projectId, editing: false })
    }

    this.props.onUpdateProject({ id: projectId, name, editing: false })
  }

  del = () => {
    const projectId = this.props.project.id
    this.props.onDeleteProject(projectId)
  }

  activateEdit = () => {
    const projectId = this.props.project.id
    this.props.onUpdateProject({ id: projectId, editing: true })
  }

  select = () => {
    this.props.onSelectProject(this.props.project.id)
  }

  render() {
    const { project } = this.props

    // TODO implement color picker
    return (
      <div className={classNames('input-group', style.inputgroup)}>
        <EditField
          className='project-name'
          editing={project.editing}
          value={project.name}
          onEdit={this.editName}
          onValueClick={this.select}
        />

        <DropdownButton>
          <a href='#' className='dropdown-item' onClick={this.activateEdit}>
            Edit Project
          </a>
          <a href='#' className='dropdown-item' onClick={this.del}>
            Delete Project
          </a>
        </DropdownButton>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onUpdateProject: project => {
    dispatch(updateProject(project))
  },
  onSelectProject: id => {
    dispatch(selectProject(id))
  },
  onDeleteProject: id => {
    dispatch(deleteProject(id))
  }
})

export default connect(null, mapDispatchToProps)(Project)
