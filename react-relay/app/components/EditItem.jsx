// @flow

import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import DropdownButton from '../components/DropdownButton'
import style from '../styles/item.css'

export default class EditItem extends Component {
  static propTypes = {
    task: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    editing: PropTypes.bool,
    checked: PropTypes.bool,
    onCheck: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  static defaultProps = {
    date: new Date(),
    editing: false,
    checked: false
  }

  constructor(props) {
    super(props)
    this.state = this.mapPropsToState(props)
  }

  componentWillReceiveProps(props) {
    this.state = this.mapPropsToState(props)
  }

  handleChange = e => {
    const name = e.target.name
    const value = name !== 'date' ? e.target.value : moment(e.target.value).format('YYYY-MM-DD')
    this.setState({ [name]: value })
  }

  mapPropsToState = props => ({
    task: props.task,
    date: moment(props.date).format('YYYY-MM-DD')
  })

  finishEdit = () => {
    this.props.onUpdate({
      task: this.state.task,
      date: moment(this.state.date).toDate()
    })
  }

  renderValue = () =>
    <div className='input-group'>
      <span className={classNames('input-group-addon', style.inputgroupaddon)}>
        <input type='checkbox' name='checkbox' className={style.todocheckbox} checked={this.props.checked} />
        <label htmlFor='checkbox'>
          <span tabIndex={0} role='button' onClick={this.props.onCheck} />
        </label>
      </span>
      <a href='#' className={classNames('form-control', style.formcontrol)} onClick={this.props.onClick}>
        {this.props.task}
      </a>
      <DropdownButton>
        <a href='#' className='dropdown-item' onClick={this.props.onEdit}>
          Edit Item
        </a>
        <a href='#' className='dropdown-item' onClick={this.props.onDelete}>
          Delete Item
        </a>
      </DropdownButton>
    </div>

  renderEdit = () =>
    <div>
      <div className='input-group'>
        <input
          type='text'
          name='task'
          className={classNames('form-control', style.formcontrol, style.formcontroledit)}
          value={this.state.task}
          onChange={this.handleChange}
        />
        <input
          type='date'
          name='date'
          className={classNames('form-control', style.formcontrol, style.formcontroledit)}
          value={this.state.date}
          onChange={this.handleChange}
        />
      </div>
      <div className='action-group'>
        <button className='btn btn-danger' onClick={this.finishEdit}>
          Save
        </button>
        <button className='btn btn-default' onClick={this.finishEdit}>
          Cancel
        </button>
      </div>
    </div>

  render() {
    const { editing } = this.props
    return editing ? this.renderEdit() : this.renderValue()
  }
}
