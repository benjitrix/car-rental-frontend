import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaShoppingCart } from 'react-icons/fa'
import { useGlobalContext } from '../context/Context'
import '../css/Navbar.css'

const Navbar = () => {
  const [show, setShow] = useState(false)
  const [userShown, setUserShown] = useState()
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState("40%")

  const { user } = useGlobalContext()
  const menuRef = useRef()

  useEffect(() => {
    setUserShown(user.name)
  }, [user])

  const menuHeightOpen = () => {
    const rectHeight = menuRef.current.scrollHeight
    setHeight(rectHeight);
    setWidth("100%")
  }

  const menuHeightClose = () => {
    setHeight(0);
    setWidth(0)
  }

  return (
    <section className='navbar'>
      <div className="navbar-container">
        <div className='logo-cart-user-hamburger'>
          <h2 className='logo'>
            <Link to='/' className='logo-link'>Car Rental!</Link>
          </h2>
          <div className='cart-user-hamburger'>
            <Link 
              to='/cart' 
              className='cart-link'>
                <FaShoppingCart />
            </Link>
            { user.name && <p className='user-link'>{userShown}</p>}
            <button 
              className='hamburger-link' 
              onClick={
                () => {setShow(!show); 
                show ? menuHeightOpen() : menuHeightClose()}}>
              <FaBars />
            </button>
          </div>
        </div>
        <div className={`drop-down-menu ${show ? 'show-links' : '' }`} ref={menuRef} style={{height: height, width: width}}>
          <Link 
            to='/'
            className='drop-down-link'
            onClick={
                () => {setShow(!show); 
                show ? menuHeightOpen() : menuHeightClose()}}>
            Home
          </Link>
          {
            user.name && 
              <Link 
                to='/cart'
                className='drop-down-link'
                onClick={
                () => {setShow(!show); 
                show ? menuHeightOpen() : menuHeightClose()}}>
                User Reservations
              </Link>
          }
          <Link 
            to='/about'
            className='drop-down-link'
            onClick={
                () => {setShow(!show); 
                show ? menuHeightOpen() : menuHeightClose()}}>
            About
          </Link>
          {
            user.role === 'admin' && 
              <Link 
                to='/register-vehicle'
                className='drop-down-link'
                onClick={
                () => {setShow(!show); 
                show ? menuHeightOpen() : menuHeightClose()}}>
                Register Vehicle
              </Link>
          }
          {
            user.name === '' ? 
              <Link 
                to='/login'
                className='drop-down-link'
                onClick={
                () => {setShow(!show); 
                show ? menuHeightOpen() : menuHeightClose()}}>
                Login
              </Link> : 
              <Link 
                to='/logout'
                className='drop-down-link'
                onClick={
                () => {setShow(!show); 
                show ? menuHeightOpen() : menuHeightClose()}}>
                Logout
              </Link>
          }
        </div>
      </div>
    </section>
  )
}

export default Navbar