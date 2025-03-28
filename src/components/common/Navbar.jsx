import React from 'react'
import logo from '../../assets/Logo/Vista Logos (1)/logo-transparent-png.png'
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropDown'

const Navbar = () => {

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);
  
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname)
  }

  return (
    <div className='flex h-12 md:h-16 items-center justify-center bg-gradient-to-b from-white to-transparent opacity-90 fixed w-full top-0 left-0 shadow-md z-50 mb-10'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            {/* Image */}
            <Link to="/" className='flex-shrink-0'>
                <img 
                  src={logo} 
                  width={150} 
                  height={100} 
                  loading='lazy'
                  alt='MesserBit Logo'
                  className='w-[150px] sm:w-[200px] md:w-[220px] lg:w-[250px]'
                />
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex gap-x-6 text-richblack-25">
              <ul className='flex gap-x-6 text-richblack-25'>
                {
                  NavbarLinks.map((link, index) => (
                   <li key={index} className='text-brown-600  font-bold'>
                      {
                        <Link to={link?.path}>
                          <p className={`${matchRoute(link?.path) ? "text-brown-800  font-bold": "text-brown-600  font-bold"}`}>
                            {link.title}
                          </p>
                        </Link>
                      }
                   </li>
                  ))
                }
              </ul>
            </nav>

            {/* Login/ Signup/Dashboard */}
            <div className='flex items-center gap-x-4'>
                {
                  user && user?.accountType !== "Admin" && (
                    <Link to="/dashboard/cart" className='relative'>
                      <AiOutlineShoppingCart className="text-brown-600" size={24}/>
                      {
                        totalItems > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {totalItems}
                          </span>
                        )
                      }
                    </Link>
                  )
                }
                {
                  token === null && (
                    <Link to="/login">
                      <button className='hidden sm:block bg-brown-600 px-3 py-2 text-white rounded-md hover:bg-brown-800 transition-all duration-300'>
                        Log in
                      </button>
                    </Link>
                  )
                }
                {
                  token === null && (
                    <Link to="/signup">
                      <button className='hidden sm:block bg-brown-600 px-3 py-2 text-white rounded-md hover:bg-brown-800 transition-all duration-300'>
                        Sign up
                      </button>
                    </Link>
                  )
                }
                {
                  token !== null && user && (
                    <ProfileDropdown />
                  )
                }

            </div>
        </div>
    </div>
  )
}

export default Navbar