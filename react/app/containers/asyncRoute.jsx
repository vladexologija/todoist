import React, { Component } from 'react'

const moduleDefaultExport = module => module.default || module

export default function asyncComponent(getComponent) {
  return class AsyncComponent extends Component {
    static Component = null

    state = {
      Component: AsyncComponent.Component
    }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(moduleDefaultExport).then(component => {
          AsyncComponent.Component = component

          if (this._mounted) {
            this.setState({ Component: component })
          } else {
            this.state.Component = component
          }
        })
      }
    }

    componentDidMount() {
      this._mounted = true
    }

    render() {
      return this.state.Component ? <this.state.Component {...this.props} /> : null
    }
  }
}
