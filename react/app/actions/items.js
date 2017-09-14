// namespace import syntax
import * as api from '../api'
import { getIsFetching } from '../reducers'
import createId from '../utils/createId'

export const FETCH_ITEMS = 'FETCH_ITEMS'
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS'
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE'

// asynchronous promise action creator
// export const fetchItems = (filter) =>
//   api.fetchItems(filter).then(response =>
//     receivedItems(filter, response)
//   );

// functions returned from other functions are called thunks
// thunk middleware allows us to dispatch actions asynchronously
export const fetchItems = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return
  }

  dispatch({
    type: FETCH_ITEMS,
    filter
  })

  // return api.fetchItems(filter).then(
  //   response => {
  //     dispatch({
  //       type: FETCH_ITEMS_SUCCESS,
  //       filter,
  //       response
  //     })
  //   },
  //   error => {
  //     dispatch({
  //       type: FETCH_ITEMS_FAILURE,
  //       filter,
  //       message: error.message || 'Something went wrong.'
  //     })
  //   }
  // )
}

export const CREATE_ITEM = 'CREATE_ITEM'
export const createItem = item => ({
  type: CREATE_ITEM,
  item: {
    id: createId(),
    ...item
  }
})

// object literal expression
export const UPDATE_ITEM = 'UPDATE_ITEM'
export const updateItem = item => ({
  type: UPDATE_ITEM,
  item
})

export const DELETE_ITEM = 'DELETE_ITEM'
export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    id
  }
}
