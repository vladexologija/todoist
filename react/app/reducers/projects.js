import * as types from '../actions/projects'
import update from 'react-addons-update'

const initialState = []

export default function projects(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVED_PROJECTS: {
      return [...action.response]
    }

    case types.CREATE_PROJECT:
      return [...state, action.project]

    case types.UPDATE_PROJECT:
      return state.map(project => {
        if (project.id === action.id) {
          const { type, ...updatedProject } = action

          return Object.assign({}, project, updatedProject)
        }

        return project
      })

    case types.DELETE_PROJECT:
      return state.filter(project => project.id !== action.id)

    case types.SELECT_PROJECT: {
      return state.map(project => {
        const p = { ...project }
        if (project.id === action.id) {
          p.selected = true
        } else {
          p.selected = false
        }

        return p
      })
    }

    case types.MOVE_ITEM: {
      const { sourceId, targetId } = action

      const sourceProject = [...state].filter(project => project.items.includes(sourceId))[0]
      const targetProject = [...state].filter(project => project.items.includes(targetId))[0]

      const sourceNoteIndex = sourceProject.items.indexOf(sourceId)
      const targetNoteIndex = targetProject.items.indexOf(targetId)

      if (sourceProject === targetProject) {
        console.log('0>>>>>>>>>>')
        return state.map(project => {
          console.log('1>>>>>>>>>>')
          // move at once to avoid complications / update immutability helper
          if (project.id === sourceProject.id) {
            console.log('2>>>>>>>>>>')
            project.items = update(project.items, {
              $splice: [[sourceNoteIndex, 1], [targetNoteIndex, 0, sourceId]]
            })
          }

          return project
        })
      }
      return state.map(project => {
        // get rid of the source
        if (project.id === sourceProject.id) {
          project.items.splice(sourceNoteIndex, 1)
        }

        // and move it to target
        if (project.id === targetProject.id) {
          project.items.splice(targetNoteIndex, 0, sourceId)
        }

        return project
      })
    }

    case types.ATTACH_ITEM:
      const projectId = action.projectId
      const itemId = action.itemId

      return state.map(project => {
        if (!project.items) {
          return Object.assign({}, project, {
            items: []
          })
        }

        if (project.items.includes(itemId)) {
          project.items = project.items.filter(item => item !== itemId)
        }

        const index = project.items.indexOf(itemId)

        if (index >= 0) {
          return project
        }

        if (projectId === project.id) {
          return Object.assign({}, project, {
            items: [...project.items, itemId]
          })
        }

        return project
      })

    case types.DETACH_ITEM:
      return state.map(project => {
        if (project.id === action.projectId) {
          return Object.assign({}, project, {
            notes: project.items.filter(id => id !== action.noteId)
          })
        }

        return project
      })

    default:
      return state
  }
}

export const getSelectedProject = state => state.find(project => project.selected)
