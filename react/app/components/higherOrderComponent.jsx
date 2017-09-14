import React from 'react'

export default function higherOrderComponent(WrappedComponent, callback) {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.handleChange = this.handleChange.bind(this)
      this.state = {
        clicks: 0
      }
    }

    componentDidMount() {
      window.addEventListener('mousedown', this.handleChange, false)
    }

    componentWillUnmount() {
      window.removeEventListener('mousedown', this.handleChange)
    }

    handleChange() {
      console.log('handleChange', this.state.clicks)
      this.setState({
        clicks: callback(this.state.clicks + 1)
      })
    }

    render() {
      return <WrappedComponent clicks={this.state.clicks} {...this.props} />
    }
  }
}
