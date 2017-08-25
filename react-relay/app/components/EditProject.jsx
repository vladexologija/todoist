// @flow

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import DropdownButton from '../components/DropdownButton'
import style from '../styles/project.css'

export default class EditProject extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    editing: PropTypes.bool,
    onEdit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    selected: false,
    editing: false
  }

  checkEnter = e => {
    // The user hit *enter*, let's finish up.
    if (e.key === 'Enter') {
      this.finishEdit(e)
    }
  }

  finishEdit = e => {
    const value = e.target.value

    if (this.props.onUpdate) {
      // It can be a good idea to name your callbacks using on prefix.
      this.props.onUpdate(value)
    }
  }

  renderValue = () =>
    <div className={classNames('input-group', style.inputgroup)}>
      <a
        href='#'
        className={classNames('form-control', style.formcontrol, { [style.selected]: this.props.selected })}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </a>
      <DropdownButton>
        <a href='#' className='dropdown-item' onClick={this.props.onEdit}>
          Edit Project
        </a>
        <a href='#' className='dropdown-item' onClick={this.props.onDelete}>
          Delete Project
        </a>
      </DropdownButton>
    </div>

  renderEdit = () =>
    <input
      type='text'
      autoFocus
      className={classNames('form-control', style.formcontrol)}
      ref={e => (e ? (e.selectionStart = this.props.value.length) : null)}
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
    />

  render() {
    const { editing } = this.props
    return editing ? this.renderEdit() : this.renderValue()
  }
}
