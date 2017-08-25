import React from 'react'
import ReactDom from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

import Root from './containers/Root'

ReactDom.render(<Root />, document.getElementById('root'))

// webpack
if (module.hot) {
  module.hot.accept('./containers/Root', () => ReactDom.render(<Root />, document.getElementById('root')))
}
