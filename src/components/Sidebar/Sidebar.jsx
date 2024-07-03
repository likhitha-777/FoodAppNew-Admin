import React from 'react'
import './Sidebar.css'
import { add_icon } from '../../assets/assets'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-options'>
        <NavLink to='/add' className='sidebar-option'>
            <img src={add_icon} alt="" />
            <p>Add items</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-option'>
            <img src={add_icon} alt="" />
            <p>List items</p>
        </NavLink>
        <NavLink to='/orders' className='sidebar-option'>
            <img src={add_icon} alt="" />
            <p>Orders</p>
        </NavLink>

        </div>

    </div>
  )
}

export default Sidebar