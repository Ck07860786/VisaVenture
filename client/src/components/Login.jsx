 import React, { useState } from 'react';
import SideImage from '../assets/Images/SideImage.png';
import MainLogo from '../assets/Images/MainLogo.png';
import axios from 'axios';
import { BASE_URL } from '@/helper/Port.js';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/auth';
import { useUserAuth } from '@/context/userAuth';






function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [userAuth,setUserAuth] = useUserAuth();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true)
  
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/user-login`, {
        email,
        password,
      });
  
      // Check if the request was successful
      if (response.data.success) {
        toast.success(response.data.message);
  
        const { user } = response.data;
        console.log('user', user); // Log the user data
  
        // Set user auth context
        setUserAuth({
          user: user,
          token: user.token,
        });
  
        // Store user details in localStorage
        localStorage.setItem(
          'userAuth',
          JSON.stringify({
            user: user,
            token: user.token,
          })
        );
  
        // Role-based redirection
        if (user.role === 'admin') {
          navigate('/admin-dashboard'); 
        } else if (user.role === 'user') {
          navigate('/user-dashboard'); 
        } else {
          toast.error('Unauthorized role');
        }
      } else {
        toast.error(response.data.message); 
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login'); 
    }
    finally{
      setLoading(false)
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section */}
      <section className="bg-white w-1/2 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className=' text-4xl font-bold mb-8 '>Visa<span className=' text-blue-800 '>Venture</span></h1>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login 
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
           
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}

                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                  Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
               
                <button
                  type="submit"
                  className={`w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                    loading ? 'cursor-not-allowed opacity-75' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    'Login'
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link to='/signup'
                    
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register!
                  </Link>
                </p>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Right Section */}
      <div className="relative hidden md:block md:w-1/2">
        <img className=" h-svh  object-cover " src={SideImage} alt="Background" />
        
        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black px-6">
          
        </div>
      </div>
    </div>
  );
}

export default Login;