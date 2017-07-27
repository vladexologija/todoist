import moment from 'moment'
import * as types from '../actions/items'

const initialState = {
  isFetching: false
}

// TODO add child item reducer
export default function items(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ITEMS_START: {
      const nextState = { ...state }

      nextState.isFetching = true
      nextState.message = null

      return nextState
    }

    case types.FETCH_ITEMS_FAILURE: {
      const nextState = { ...state }

      nextState.isFetching = false
      nextState.message = action.message

      return nextState
    }

    case types.FETCH_ITEMS_SUCCESS: {
      const nextState = { ...state }
      nextState.isFetching = false

      action.response.forEach(item => {
        nextState[item.id] = item
      })

      return nextState
    }

    case types.CREATE_ITEM: {
      const { item } = action

      return {
        ...state,
        [item.id]: item
      }
    }

    case types.UPDATE_ITEM: {
      const { item } = action
      const updatedItem = Object.assign({}, state[item.id], item)

      return Object.assign({}, state, {
        [item.id]: updatedItem
      })
    }

    case types.DELETE_ITEM: {
      const { [action.id]: deletedItem, ...rest } = state
      return rest
    }

    default:
      return state
  }
}

// named export is function that prepares data to be displayed by ui - selectors
export const getVisibleItems = (state, project, filter) => {
  let items = []

  // map to proper values and remove blanks
  const projectItems = project ? project.items.map(id => state[id]).filter(item => item) : state

  switch (filter) {
    case 'all':
      items = projectItems
      break
    case 'completed':
      items = projectItems.filter(item => item.completed)
      break
    case 'active':
      items = projectItems.filter(item => !item.completed)
      break
    default:
      items = projectItems
  }

  return items
}

export const getDueItems = (state, date) =>
  Object.values(state).filter(item => item && moment(item.date).isSameOrBefore(moment(date), 'day'))

export const getIsFetching = state => state.isFetching

export const getErrorMessage = state => state.message

export const fuckYou = state => state.message
