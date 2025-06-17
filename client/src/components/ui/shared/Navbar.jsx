import React from 'react';
import { Button } from '../button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useUserAuth } from '@/context/userAuth'; 
import toast from 'react-hot-toast';

function Navbar() {
  const [auth, setAuth] = useAuth(); 
  const [userAuth, setUserAuth] = useUserAuth(); 
  const navigate = useNavigate();

  const handleAgentLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Agent Logged Out Successfully');
    navigate('/agent-login');
  };

  const handleUserLogout = () => {
    setUserAuth({
      ...userAuth,
      user: null,
      token: '',
    });
    localStorage.removeItem('userAuth');
    toast.success('User Logged Out Successfully');
    navigate('/login');
  };

  return (
    <div
      className="p-4 fixed top-0 w-full shadow-sm z-50"
      style={{ backgroundColor: '#EFF3F8' }}
    >
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <h1 className="text-black drop-shadow-lg text-3xl font-bold">
            Visa<span className="text-blue-900">Venture</span>
          </h1>
        </div>

        {/* NavLinks Section */}
        <div className="hidden md:flex-grow md:flex justify-center font-medium space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/user-dashboard">Agents</NavLink>
          <NavLink to="/blogs/1">Blogs</NavLink>
          <NavLink to="/">About Us</NavLink>
          <NavLink to="/">Contact</NavLink>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button className="text-black focus:outline-none" type="button" onClick={() => document.getElementById("mobile-menu").classList.toggle("hidden")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Auth Buttons Section (Desktop) */}
        <div className="hidden md:flex-shrink-0 md:flex gap-4">
          {!auth.user && !userAuth.user ? (
            <>
              <Link to="/login">
                <Button>User Login</Button>
              </Link>
              <Link to="/agent-login">
                <Button>Agent Login</Button>
              </Link>
            </>
          ) : auth.user ? (
            <>
              <NavLink onClick={handleAgentLogout} to="/agent-login">
                <Button>Logout</Button>
              </NavLink>
            </>
          ) : userAuth.user ? (
            <>
              <NavLink onClick={handleUserLogout} to="/login">
                <Button>Logout</Button>
              </NavLink>
            </>
          ) : null}
        </div>
      </div>

      {/* Mobile Menu Section */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="flex flex-col items-center font-medium space-y-4 py-4">
          <NavLink to="/" className="w-full text-center">Home</NavLink>
          <NavLink to="/user-dashboard" className="w-full text-center">Agents</NavLink>
          <NavLink to="/blogs/1">Blogs</NavLink>
          <NavLink to="/" className="w-full text-center">About Us</NavLink>
          <NavLink to="/" className="w-full text-center">Contact</NavLink>

          {/* Auth Buttons for Mobile */}
          {!auth.user && !userAuth.user ? (
            <>
              <Link to="/login">
                <Button className="w-full">User Login</Button>
              </Link>
              <Link to="/agent-login">
                <Button className="w-full">Agent Login</Button>
              </Link>
            </>
          ) : auth.user ? (
            <>
              <NavLink onClick={handleAgentLogout} to="/agent-login">
                <Button className="w-full">Logout</Button>
              </NavLink>
            </>
          ) : userAuth.user ? (
            <>
              <NavLink onClick={handleUserLogout} to="/login">
                <Button className="w-full">Logout</Button>
              </NavLink>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
