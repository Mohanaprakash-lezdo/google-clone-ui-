import React from 'react'
import {NavLink} from 'react-router-dom'
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <ul>
          <li>
          <NavLink to='/'>Notes</NavLink>
          </li>
          <li>
          <NavLink to='/Reminder'>Reminders</NavLink>
          </li>
          <li>
          <NavLink to='Editlabel'>Edit Labels</NavLink>
          </li>
          <li>
          <NavLink to='Archive'>Archive</NavLink>
          </li>
          <li>
          <NavLink to='Trash'>Trash</NavLink>
          </li>
           
            
            </ul>
    </div>
  )
}

export default Sidebar