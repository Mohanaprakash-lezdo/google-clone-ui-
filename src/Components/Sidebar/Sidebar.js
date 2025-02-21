import React from 'react'
import {NavLink} from 'react-router-dom'
import './Sidebar.css'
const Sidebar = ({labels,openModal}) => {
  // const navigate=useNavigate();
  return (
    <div className='sidebar'>
        <ul>
          <li>
          <NavLink to='/' className={({isActive})=>(isActive?'active':'')}>Notes</NavLink>
          </li>
          <li>
          <NavLink to='/Reminder' className={({isActive})=>(isActive?'active':'')}>Reminders</NavLink>
          </li>
          {labels && labels.length>0 &&(
            <div className='sidebar-labels'>
              {/* <h4>Labels</h4> */}
              {labels.map((label)=>(
                <li
                key={label}
                className='label-item'>
                  <NavLink to={`/label/${label}`}
                  className={({isActive})=>(isActive?'active':'')}
                  aria-label={`view notes  for ${label}`}>
                     {label}
                  </NavLink>    
                </li>
              ))}

            </div>
          )}
          <li onClick={openModal} className='edit-labels'>
          Edit Labels
          </li>
          <li>
          <NavLink to='/Archive' className={({isActive})=>(isActive?'active':'')}>Archive</NavLink>
          </li>
          <li>
          <NavLink to='/Trash' className={({isActive})=>(isActive?'active':'')}>Trash</NavLink>
          </li>
          {/* {Dynamic Labels Section} */}
         
            
            </ul>
    </div>
  )
}

export default Sidebar