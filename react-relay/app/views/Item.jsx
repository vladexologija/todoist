// @flow

import React, { PropTypes } from 'react'

import { createFragmentContainer, graphql } from 'react-relay'

class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  render() {
    const { item } = this.props
    console.log('this.props', this.props)
    return (
      <span>
        {item.content}
      </span>
    )
  }
}

export default createFragmentContainer(
  Item,
  graphql`
    fragment Item_item on todo {
      id
      content
      checked
    }
  `
)
