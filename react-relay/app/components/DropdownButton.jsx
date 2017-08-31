// @flow

import React from 'react'
import classNames from 'classnames'
import style from '../styles/project.css'

export default class DropdownButton extends React.Component {
  state = {
    show: false
  }

  toggleDropdown = show => {
    const state = show !== undefined ? show : !this.state.show
    this.setState({ show: state })
  }

  render() {
    return (
      <div className={classNames('input-group-btn', { show: this.state.show })}>
        <button
          type='button'
          className={classNames('btn', 'btn-secondary', 'dropdown-toggle', style.dropdowntoggle)}
          onBlur={() =>
            setTimeout(() => {
              this.toggleDropdown(false)
            }, 200)}
          onClick={this.toggleDropdown}
          data-toggle='dropdown'
        >
          <span className='fa fa-ellipsis-v' />
        </button>
        <div className={classNames('dropdown-menu dropdown-menu-right', { show: this.state.show })}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
