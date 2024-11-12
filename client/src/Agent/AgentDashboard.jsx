// AgentDashboard.js
import React from 'react';
; // Import the useAuth hook for authentication context
import { Link } from 'react-router-dom'; // If using React Router for navigation
import Navbar from '@/components/ui/shared/Navbar';
import backgroundImage from '../assets/Images/Herobgi.png'
import { useAuth } from '@/context/auth';
import { UserPen } from 'lucide-react';
import { MdVerified } from 'react-icons/md';
import { Fingerprint } from 'lucide-react';
import { FileText } from 'lucide-react';
import { MessageCircleQuestion } from 'lucide-react';
import { ChartPie } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { BellRing } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';




const AgentDashboard = () => {

  const [auth,setAuth] = useAuth(); // Get auth info (such as agent details)
  
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
  
  return (
    <div
    className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col justify-center  p-4"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div className="w-64  text-black  bg-transparent  p-6">
        <h2 className="text-2xl font-semibold mb-8">Agent Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li className=' flex items-center gap-2 hover:bg-zinc-900 hover:text-white p-2 rounded '>
              <span><ChartPie/></span>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className=' flex items-center gap-2 hover:bg-zinc-900 hover:text-white p-2 rounded '>
              <span><UserPen/></span>
              <Link to="/profile">Profile</Link>
            </li>
            <li className=' flex items-center gap-2 hover:bg-zinc-900 hover:text-white p-2 rounded '>
              <span><Fingerprint/></span>
              <Link to="/kyc-status" >KYC Status</Link>
            </li>
            <li className=' flex items-center gap-2 hover:bg-zinc-900 hover:text-white p-2 rounded '>
              <span><FileText/></span>
              <Link to="/documents" >Documents</Link>
            </li>
            <li className=' flex items-center gap-2 hover:bg-zinc-900 hover:text-white p-2 rounded  '>
              <span><MessageCircleQuestion/></span>
              <Link to="/support" >Support</Link>
            </li>
            <li className=' flex items-center gap-2 hover:bg-zinc-900 hover:text-white p-2 rounded  '>
              <span><BellRing/></span>
              <Link to="/support" >Notifications</Link>
            </li>
            <li className=' flex items-center gap-2 hover:bg-zinc-900 hover:text-white p-2 rounded  '>
              <span><MessagesSquare/></span>
              <Link to="/support" >Messages</Link>
            </li>
            <li className=' flex items-center gap-2 hover:bg-zinc-900 hover:text-white p-2 rounded  '>
              <span><LogOut/></span>
              <Link onClick={handleAgentLogout}  to='/agent-login' >LogOut</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
      
       
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Welcome, {auth?.user?.name || 'Agent'} 👋</h1>
          
          {/* Overview Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-lg ">
                <h3 className="text-lg font-semibold">KYC Status</h3>
                <p className="mt-2">{auth?.user?.kycStatus || 'Pending'}</p>
                <Link to="/kyc-status" className="text-blue-500 hover:underline">View Details</Link>
              </div>
              <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-lg ">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <p className="mt-2">No recent activity</p>
              </div>
              <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-lg ">
                <h3 className="text-lg font-semibold">Profile Completion</h3>
                <p className="mt-2">75% Complete</p>
                <Link to="/profile" className="text-blue-500 hover:underline">Complete Profile</Link>
              </div>
            </div>
          </section>

          {/* KYC Status Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">KYC Verification</h2>
            <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-lg">
              <p>Your KYC is currently <strong>{auth?.user?.kycStatus || 'Pending'}</strong>.</p>
              {auth?.user?.kycStatus === 'pending' && (
                <p className="mt-4 text-yellow-600">Please complete your KYC submission.</p>
              )}
              {auth?.user?.kycStatus === 'approved' && (
                <p className="mt-4 flex items-center  text-green-600">Your KYC has been approved. <MdVerified className=' ml-2 text-blue-500 ' /></p>
              )}
              {auth?.user?.kycStatus === 'rejected' && (
                <p className="mt-4 text-red-600">Your KYC has been rejected. Please contact support for assistance.</p>
              )}
            </div>
          </section>

          {/* Support Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-lg ">
              <p>Need assistance? Our support team is here to help you.</p>
              <Link to="/support" className="text-blue-500 hover:underline">Contact Support</Link>
            </div>
          </section>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
