import React from 'react'
import classNames from 'classnames'
import logo from '../styles/images/logo.png'
import styles from '../styles/navbar.css'

export default () =>
  <nav className={classNames('navbar', styles.navbar, 'navbar-toggleable-md', 'navbar-inverse', 'bg-inverse')}>
    <div className='container'>
      <a href='#' className={classNames('navbar-brand', styles.navbarbrand)}>
        <img alt='logo' className='pull-left' src={logo} />
        <span>Todoist</span>
      </a>
    </div>
  </nav>
