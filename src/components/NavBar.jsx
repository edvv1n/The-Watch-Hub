import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Nav.css'

function NavBar() {
  return (
    <nav className='navbar'>
        <div className='navbar-brand'>
            <Link to="/">The Watch Hub</Link>
        </div>
        <div className='navbar-links'>
            <Link to ="/" className='nav-link'>All Movies</Link>
            <Link to ="/favorites" className='nav-link'>My Favorite Movies</Link>
        </div>
    </nav>
  )
}

export default NavBar