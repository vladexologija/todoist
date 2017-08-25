import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import asyncRoute from './asyncRoute'

const AppRoute = asyncRoute(() => import('../views/App'))

const Root = () =>
  <Router>
    <div>
      <Switch>
        <Route path='/:date(\d{4}-\d{2}-\d{2})' date='true' component={AppRoute} />
        <Route exact path='/:filter?' component={AppRoute} />
        <Route render={() => <h1>Page not found </h1>} />
      </Switch>
    </div>
  </Router>

export default Root
