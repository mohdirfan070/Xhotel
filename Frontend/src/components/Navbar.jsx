import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className="navbar  bg-base-300 ">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100  rounded-box w-52">
          {/* <li><a>Rooms</a></li> */}
          <li className='font-medium text-base hover:font-semibold hover:text-white-400' > <Link to='/rooms' >Rooms</Link></li>
        <li className='font-medium text-base hover:font-semibold hover:text-white-400' ><Link to='/bookings' >Bookings</Link></li>
        <li className='font-medium text-base hover:font-semibold hover:text-white-400' ><Link to='/checkout' >CheckOut</Link></li>
        <li className='font-medium text-base hover:font-semibold hover:text-white-400' ><Link to='/addroom' >Add Room</Link></li>
          {/* <li>
            <a>Parent</a>
            <ul className="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li> */}
         
        </ul>
      </div>
        <Link to='/' className="btn btn-ghost border-x-2 border-teal-300 hover:text-white hover:bg-base-300 hover:border-teal-300 text-xl">XHotel</Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li className='font-medium text-base hover:font-semibold hover:text-white-400' > <Link to='/rooms' >Rooms</Link></li>
        <li className='font-medium text-base hover:font-semibold hover:text-white-400' ><Link to='/bookings' >Bookings</Link></li>
        <li className='font-medium text-base hover:font-semibold hover:text-white-400' ><Link to='/checkout' >CheckOut</Link></li>
        <li className='font-medium text-base hover:font-semibold hover:text-white-400' ><Link to='/addroom' >Add Room</Link></li>
      
        {/* <li>
          <details>
            <summary>Parent</summary>
            <ul className="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li> */}
      </ul>
    </div>
    <div className="navbar-end">
      <a className="btn">Profile</a>
    </div>
  </div>
  )
}

export default Navbar