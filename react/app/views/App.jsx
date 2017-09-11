import React, { PropTypes } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'

import Navbar from '../components/Navbar'
import Projects from '../components/Projects'
import Items from '../components/Items'
import FetchError from '../components/FetchError'
import Filter from '../components/Filter'
import { attachItem, createProject, fetchProjects } from '../actions/projects'
import { createItem, fetchItems } from '../actions/items'
import { getSelectedProject, getDueItems, getVisibleItems, getIsFetching, getErrorMessage } from '../reducers'

import '../styles/app.css'

@DragDropContext(HTML5Backend)
class App extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    projects: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    filter: PropTypes.string,
    onAttachItem: PropTypes.func.isRequired,
    onCreateItem: PropTypes.func.isRequired,
    onCreateProject: PropTypes.func.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    fetchItems: PropTypes.func.isRequired
  }

  static defaultProps = {
    errorMessage: null,
    project: null,
    filter: 'all'
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.props.fetchProjects()
    this.props.fetchItems(this.props.filter)
  }

  addProject = () => {
    this.props.onCreateProject({
      name: 'New project',
      editing: true
    })
  }

  addItem = e => {
    // If note is added, avoid opening project name edit by stopping event bubling
    e.stopPropagation()
    const item = this.props.onCreateItem({
      task: 'New Item',
      editing: true
    })

    this.props.onAttachItem(this.props.project.id, item.id)
  }

  renderActions() {
    return (
      <div>
        <button className='btn btn-link' onClick={this.addItem}>
          <i className='fa fa-plus fa-lg' /> Add Task
        </button>
        <Filter />
      </div>
    )
  }

  render() {
    const { projects, project, items, isFetching, errorMessage } = this.props
    if (isFetching && !projects.length) {
      return <h1>Loading...</h1>
    }

    if (errorMessage) {
      return <FetchError message={errorMessage} onRetry={() => this.fetchData()} />
    }

    return (
      <div>
        <Navbar />
        <div className='holder container'>
          <div className='row'>
            <div className='col-md-4 sidebar'>
              <Projects onAddProject={this.addProject} projects={projects} />
            </div>
            <div className='col-md-8 content'>
              {items.length ? <Items project={project} items={items} /> : null}
              {project ? this.renderActions() : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToAppProps = (state, props) => {
  const filter = (props.match && props.match.params && props.match.params.filter) || 'all'
  const date = props.match && props.match.params && props.match.params.date

  const items = date ? getDueItems(state, date) : getVisibleItems(state, filter)
  const project = getSelectedProject(state)

  return {
    items,
    project,
    projects: state.projects,
    isFetching: getIsFetching(state),
    errorMessage: getErrorMessage(state),
    filter
  }
}

const mapDispatchToProps = dispatch => ({
  onCreateItem: item => {
    // FIXME not sure why this doesn't work
    const result = dispatch(createItem(item))
    return result.item
  },
  onAttachItem: (projectId, itemId) => {
    dispatch(attachItem(projectId, itemId))
  },
  onCreateProject: project => {
    dispatch(createProject(project))
  },
  fetchProjects: () => {
    dispatch(fetchProjects())
  },
  fetchItems: () => {
    dispatch(fetchItems())
  }
})

export default connect(mapStateToAppProps, mapDispatchToProps)(App)
