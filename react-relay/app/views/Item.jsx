// @flow

import React, { PropTypes } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import EditItem from '../components/EditItem'
import updateTodo from '../mutations/updateTodo'
import removeTodo from '../mutations/removeTodo'

class Item extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      editing: props.item.editing
    }
  }

  componentWillReceiveProps(props) {
    if (props.item.editing && props.item.editing !== this.state.editing) {
      this.state = {
        editing: props.item.editing
      }
    }
  }

  checkItem = e => {
    e.stopPropagation()
    updateTodo(this.props.item, this.props.item.content, !this.props.item.checked, this.props.viewer)
  }

  activateItemEdit = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  editItem = data => {
    updateTodo(this.props.item, data.task, this.props.item.checked, this.props.viewer, this.activateItemEdit)
  }

  deleteItem = e => {
    e.stopPropagation()
    removeTodo(this.props.item, this.props.viewer, () => console.log('removeProject success'))
  }

  render() {
    const { item } = this.props

    return (
      <EditItem
        editing={this.state.editing}
        checked={item.checked}
        task={item.content}
        date={item.date}
        onCheck={this.checkItem}
        onClick={this.activateItemEdit}
        onEdit={() => this.activateItemEdit(item.id)}
        onUpdate={data => this.editItem(data)}
        onDelete={this.deleteItem}
      />
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
      editing
    }
  `
)
