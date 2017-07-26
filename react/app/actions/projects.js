// namespace import syntax
import * as api from '../api'
import createId from '../utils/createId'

export const RECEIVED_PROJECTS = 'RECEIVED_PROJECTS'
const receivedProjects = response => ({
  type: RECEIVED_PROJECTS,
  response
})

// asynchronous action creator
// export const fetchProjects = () =>
//   api.fetchProjects().then(response =>
//     receivedProjects(response)
//   );

export const fetchProjects = () => dispatch =>
  // dispatch( requestProjects());

  api.fetchProjects().then(response => {
    dispatch(receivedProjects(response))
  })

export const CREATE_PROJECT = 'CREATE_PROJECT'
export function createProject(project) {
  return {
    type: CREATE_PROJECT,
    project: {
      id: createId(),
      items: project.items || [],
      ...project
    }
  }
}

export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export function updateProject(updatedProject) {
  return {
    type: UPDATE_PROJECT,
    ...updatedProject
  }
}

export const DELETE_PROJECT = 'DELETE_PROJECT'
export function deleteProject(id) {
  return {
    type: DELETE_PROJECT,
    id
  }
}

export const SELECT_PROJECT = 'SELECT_PROJECT'
export function selectProject(id) {
  return {
    type: SELECT_PROJECT,
    id
  }
}

export const ATTACH_ITEM = 'ATTACH_ITEM'
export function attachItem(projectId, itemId) {
  return {
    type: ATTACH_ITEM,
    id: createId(),
    projectId,
    itemId
  }
}

export const MOVE_ITEM = 'MOVE_ITEM'
export function moveItem(sourceId, targetId) {
  return {
    type: MOVE_ITEM,
    sourceId,
    targetId
  }
}

export const DETACH_ITEM = 'DETACH_ITEM'
export function detachItem(projectId, itemId) {
  return {
    type: DETACH_ITEM,
    id: createId(),
    projectId,
    itemId
  }
}
