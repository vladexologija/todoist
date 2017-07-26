// @flow

import React, { PropTypes } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import Project from '../views/Project'
import style from '../styles/nav.css'

const Projects = props =>
  <div>
    <div>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/inbox'>
            <i className='fa fa-calendar-o fa-lg' /> Inbox
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/today'>
            <i className='fa fa-calendar fa-lg' /> Today
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/next'>
            <i className='fa fa-calendar-check-o fa-lg' /> Next 7 days
          </NavLink>
        </li>
      </ul>
    </div>
    <div>
      <ul className={classNames('nav', style.nav, 'nav-tabs', 'nav-justified')}>
        <li className='nav-item'>
          <a href='#' className={classNames('nav-link', style.navlink, style.active)}>
            Projects
          </a>
        </li>
        <li className='nav-item'>
          <a href='#' className={classNames('nav-link', style.navlink)}>
            Filters
          </a>
        </li>
      </ul>
      <div className='tab-content'>
        <ul className='nav flex-column nav-sidebar'>
          {props.projects.map(project =>
            <li key={project.id} className='nav-item'>
              <Project project={project} />
            </li>
          )}
        </ul>
      </div>
      <button type='button' className='btn btn-link' onClick={props.onAddProject}>
        <i className='fa fa-plus fa-lg' /> Add Project
      </button>
    </div>
  </div>

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  onAddProject: PropTypes.func.isRequired
}

export default Projects
