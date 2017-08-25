// @flow

import React from 'react'
import { NavLink } from 'react-router-dom'

export default ({ filter, children }) =>
  <NavLink
    exact
    to={filter === 'all' ? '/' : `/${filter}`}
    activeStyle={{
      textDecoration: 'none',
      color: 'gray'
    }}
  >
    {children}
  </NavLink>
