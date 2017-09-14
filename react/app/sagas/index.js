import 'regenerator-runtime/runtime'
import { call, put, takeEvery } from 'redux-saga/effects'
import * as api from '../api'

export const FETCH_ITEMS = 'FETCH_ITEMS'
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS'
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE'

function* fetchItems(action) {
  try {
    const response = yield call(api.fetchItems, action.filter)
    yield put({
      type: FETCH_ITEMS_SUCCESS,
      filter: action.filter,
      response
    })
  } catch (e) {
    yield put({ type: FETCH_ITEMS_FAILURE, message: e.message || 'Something went wrong.' })
  }
}

function* itemsSaga() {
  yield takeEvery(FETCH_ITEMS, fetchItems)
}

export default itemsSaga
