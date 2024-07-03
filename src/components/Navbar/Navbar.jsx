import React from 'react'
import './Navbar.css'
import { logo } from '../../assets/assets'
import { profile_image } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
        <img src={logo} alt="" />
        <p>Admin Panel</p>
    </div>
    <div className='profile'>
        <img src={profile_image} alt="" />
        </div>
    </div>
  )
}

export default Navbar