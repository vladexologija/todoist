import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'
import reducers from '../reducers'
import sagas from '../sagas'

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [thunk, sagaMiddleware]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    reducers /* preloadedState, */,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middlewares)
  )
  /* eslint-enable */

  sagaMiddleware.run(sagas)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
