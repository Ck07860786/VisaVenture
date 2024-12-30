import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './Pages/Hero';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AgentSignUp from './Agent/AgentSignUp';
import AgentLogin from './Agent/AgentLogin';
import AgentKYC from './Agent/AgentKyc';
import AgentDashboard from './Agent/AgentDashboard';
import UserDashboard from './user/UserDashboard';
import NotFound from './components/NotFound';
import PrivateRoute from './components/routes/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import KycSubmitted from './components/ui/shared/KycSubmitted';
import KycRejected from './components/ui/shared/KycRejected';
import AdminDashboard from './admin/AdminDashboard';
import AgentProfile from './Agent/AgentProfile';
import Chat from './components/Chat';
import VisaApplication from './user/VisaApplication';
import BlogDetail from './Pages/DetailedBlog';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        {/* User routes */}
       
          <Route path='/user-dashboard' element={<UserDashboard />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        

        {/* Agent routes */}
        <Route path='/agent-signup' element={<AgentSignUp />} />
        <Route path='/agent-login' element={<AgentLogin />} />
        <Route path='/agent-kyc' element={<AgentKYC />} />
        <Route path='/agent-dashboard' element={<AgentDashboard />} />
        <Route path='/kyc-submitted' element={<KycSubmitted/>}/>
        <Route path='/kyc-rejected' element={<KycRejected/>}/>
       
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/agent/:agentId' element={<AgentProfile/>}/>
        <Route path="/chat/:agentId" element={<Chat />} />
        <Route path="/apply-visa/:agentId" element={<VisaApplication />} />
        {/* 404 Not Found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
