// @flow

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'

import EditItem from '../components/EditItem'
import ItemTypes from '../constants/itemTypes'
import { updateItem, deleteItem } from '../actions/items'
import { moveItem, detachItem } from '../actions/projects'

// We can set the initial state for dragging here
const noteSource = {
  beginDrag(props) {
    return {
      id: props.id
    }
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id
  }
}

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id
    const sourceProps = monitor.getItem()
    const sourceId = sourceProps.id

    if (sourceId !== targetId) {
      targetProps.onMove({ sourceId, targetId })
    }
  }
}

@DragSource(ItemTypes.ITEM, noteSource, (cnct, monitor) => ({
  connectDragSource: cnct.dragSource(),
  isDragging: monitor.isDragging() // map isDragging() state to isDragging prop
}))
@DropTarget(ItemTypes.ITEM, noteTarget, cnct => ({
  connectDropTarget: cnct.dropTarget()
}))
class Item extends React.Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    onDetachItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onMoveItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired
  }

  moveItem = data => {
    const { sourceId, targetId } = data
    this.props.onMoveItem(sourceId, targetId)
  }

  checkItem = (id, completed, e) => {
    e.stopPropagation()
    this.props.onUpdateItem({ id, completed: !completed, editing: false })
  }

  activateItemEdit = id => {
    this.props.onUpdateItem({ id, editing: true })
  }

  editItem = (id, data) => {
    if (!data || !data.task.trim()) {
      this.props.onUpdateItem({ id, editing: false })
    } else {
      this.props.onUpdateItem({ id, ...data, editing: false })
    }
  }

  deleteItem = (e, project, id) => {
    e.stopPropagation()

    this.props.onDetachItem(project.id, id)
    this.props.onDeleteItem(id)
  }

  render() {
    const { item } = this.props
    return (
      <EditItem
        editing={item.editing}
        completed={item.completed}
        task={item.task}
        date={item.date}
        onCheck={e => this.checkItem(item.id, !!item.completed, e)}
        onClick={() => this.activateItemEdit(item.id)}
        onEdit={() => this.activateItemEdit(item.id)}
        onUpdate={data => this.editItem(item.id, data)}
        onDelete={e => this.deleteItem(e, this.props.project, item.id)}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onDetachItem: (projectId, itemId) => {
    dispatch(detachItem(projectId, itemId))
  },
  onUpdateItem: item => {
    dispatch(updateItem(item))
  },
  onMoveItem: (sourceId, targetId) => {
    dispatch(moveItem(sourceId, targetId))
  },
  onDeleteItem: id => {
    dispatch(deleteItem(id))
  }
})

export default connect(null, mapDispatchToProps)(Item)
