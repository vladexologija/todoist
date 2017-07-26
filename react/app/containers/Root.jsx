import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import asyncRoute from './asyncRoute'

// Webpack Chunk Promise
// TODO implement dynamic reducer logic
const TestingRoute = asyncRoute(() => import('../views/Testing'))
const AppRoute = asyncRoute(() => import('../views/App'))

const Root = ({ store }) =>
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path='/:filter?' component={AppRoute} />
          <Route path='/testing/' component={TestingRoute} />
          <Route path='/children/' children={match => match && <h1>Children</h1>} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    </Router>
  </Provider>

Root.propTypes = {
  store: PropTypes.shape.isRequired
}

export default Root
