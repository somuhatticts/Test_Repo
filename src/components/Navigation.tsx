import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/virtualized', label: 'Virtualized List' },
    { path: '/lazy-images', label: 'Lazy Images' },
    { path: '/performance', label: 'Performance Demo' },
  ]

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <ul className="nav-list">
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation