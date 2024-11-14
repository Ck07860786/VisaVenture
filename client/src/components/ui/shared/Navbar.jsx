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
        <div className="flex-shrink-0">
          <h1 className="text-black drop-shadow-lg text-3xl font-bold">
            Visa<span className="text-blue-900">Venture</span>
          </h1>
        </div>

        <div className="flex-grow">
          <div className="flex justify-center font-medium space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/user-dashboard">Agents</NavLink>
            <NavLink to="/">About Us</NavLink>
            <NavLink to="/">Contact</NavLink>
          </div>
        </div>

        <div className="flex-shrink-0 flex gap-4">
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
    </div>
  );
}

export default Navbar;
