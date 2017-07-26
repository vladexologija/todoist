// @flow

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import style from '../styles/project.css'

export default class EditField extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    onEdit: PropTypes.func.isRequired,
    onValueClick: PropTypes.func.isRequired
  }

  static defaultProps = {
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

    if (this.props.onEdit) {
      // It can be a good idea to name your callbacks using on prefix.
      this.props.onEdit(value)
    }
  }

  renderValue = () =>
    <a href='#' className={classNames('form-control', style.formcontrol)} onClick={this.props.onValueClick}>
      {this.props.value}
    </a>

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
