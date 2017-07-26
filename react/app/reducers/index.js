import { combineReducers } from 'redux'
import items, * as fromItems from './items'
import projects, * as fromProjects from './projects'

export default combineReducers({
  items,
  projects
})

// TODO https://github.com/reactjs/reselect

export const getSelectedProject = state => fromProjects.getSelectedProject(state.projects)

export const getVisibleItems = (state, filter) => {
  const project = fromProjects.getSelectedProject(state.projects)
  if (!project) return []

  return fromItems.getVisibleItems(state.items, project, filter)
}

export const getIsFetching = state => fromItems.getIsFetching(state.items)

export const getErrorMessage = state => fromItems.getErrorMessage(state.items)
