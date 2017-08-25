// @flow

import React, { PropTypes } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { createFragmentContainer, graphql } from 'react-relay'
import moment from 'moment'

import Project from '../views/Project'
import style from '../styles/nav.css'

const Projects = props => {
  const today = moment().format('YYYY-MM-DD')
  const next = moment().add('days', 7).format('YYYY-MM-DD')
  return (
    <div>
      <div>
        <ul className='nav flex-column'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/inbox'>
              <i className='fa fa-calendar-o fa-lg' /> Inbox
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to={today}>
              <i className='fa fa-calendar fa-lg' /> Today
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to={next}>
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
            {props.viewer.allProjects.edges.map(({ node }) =>
              <li key={node.__id} className='nav-item'>
                <Project project={node} />
              </li>
            )}
          </ul>
        </div>
        <button type='button' className='btn btn-link' onClick={props.onAddProject}>
          <i className='fa fa-plus fa-lg' /> Add Project
        </button>
      </div>
    </div>
  )
}

Projects.propTypes = {
  viewer: PropTypes.object.isRequired,
  onAddProject: PropTypes.func.isRequired
}

export default createFragmentContainer(
  Projects,
  graphql`
    fragment Projects_viewer on user {
      allProjects(last: 100) @connection(key: "Projects_allProjects", filters: []) {
        edges {
          node {
            ...Project_project
          }
        }
      }
    }
  `
)
