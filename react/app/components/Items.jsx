// @flow

import React from 'react'
import classNames from 'classnames'
import Item from '../views/Item'
import Filter from '../components/Filter'
import style from '../styles/item.css'

// TODO pass props as just ...props from parent to it's children
const Items = props =>
  <div>
    <h3 className={style.title}>
      {props.project && props.project.name}
    </h3>
    <ul className={classNames('list-group', style.listgroup)}>
      {props.items.map(item =>
        <li key={item.id} className={classNames('list-group-item', style.listgroupitem)}>
          <Item className='note' item={item} project={props.project} />
        </li>
      )}
    </ul>
    <div>
      {props.project
        ? <button className='btn btn-link' onClick={props.onAddItem}>
            <i className='fa fa-plus fa-lg' /> Add Task
          </button>
        : null}
    </div>

    <Filter />
  </div>

Items.propTypes = {
  project: React.PropTypes.object.isRequired,
  items: React.PropTypes.array.isRequired,
  onAddItem: React.PropTypes.func.isRequired
}

export default Items
