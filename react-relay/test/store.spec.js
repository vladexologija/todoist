import configureStore from '../app/storage/configureStore'
import createId from '../app/utils/createId'
import expect from 'expect'

const store = configureStore();

describe('store', () => {
  const id = createId();

  store.dispatch({
    type: 'CREATE_PROJECT',
    project: {
      id: id,
      items: [],
      name: 'test'
    }
  })

  const actual = store.getState().projects;
  const expected = [
    {
      id: id,
      items: [],
      name: 'test'
    }
  ]

  expect(actual).toEqual(expected)
})
