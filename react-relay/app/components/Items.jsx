// @flow

import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { createFragmentContainer, graphql } from 'react-relay'

import Item from '../views/Item'
import Filter from '../components/Filter'
import style from '../styles/item.css'

// TODO pass props as just ...props from parent to it's children
const Items = props => (
    <div>
      <h3 className={style.title} />
      <ul className={classNames('list-group', style.listgroup)}>
        {props.viewer.allTodos.edges.filter(({ node }) => !node.checked).map(({ node }) =>
          <li key={node.__id} className={classNames('list-group-item', style.listgroupitem)}>
            <Item className='note' viewer={props.viewer} item={node} />
          </li>
        )}
      </ul>
      <div>
        <button className='btn btn-link' onClick={props.onAddItem}>
          <i className='fa fa-plus fa-lg' /> Add Task
        </button>
      </div>
      <Filter />
    </div>
  )

Items.propTypes = {
  viewer: PropTypes.object.isRequired,
  onAddItem: PropTypes.func.isRequired
}

export default createFragmentContainer(
  Items,
  graphql`
    fragment Items_viewer on user {
      id
      allTodos(last: 100) @connection(key: "Items_allTodos", filters: []) {
        edges {
          node {
            ...Item_item
          }
        }
      }
    }
  `
)
