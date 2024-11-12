import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/helper/Port';
import Navbar from '@/components/ui/shared/Navbar';
import backgroundImage from '../assets/Images/Herobgi.png'
import { MdVerified } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/kyc/agent/all-kyc`);
        const approvedAgents = response.data.filter(agent => agent.kycStatus === 'approved');
        setAgents(approvedAgents);
      } catch (error) {
        toast.error('Failed to load agents');
        console.log('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      <div className="mt-24 flex flex-col items-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Available Agents</h2>
        {agents.length === 0 ? (
          <p className="text-gray-600">No approved agents available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
            {agents.map(agent => (
              <div
                key={agent._id}
                className="  p-6 mb-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={agent.personalDocuments.profileImage?.url || '/placeholder-image.jpg'}
                  alt={agent.name}
                  className="w-32 h-32 object-cover rounded-full shadow-lg mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold flex items-center  justify-center text-center text-gray-800">{agent.name}<MdVerified className=' ml-2 text-blue-500 ' /></h3>
                <p className="text-center text-gray-500"><strong>Country:</strong> {agent.country}</p>
                <p className="text-center text-gray-500"><strong>Email:</strong> {agent.email}</p>
                <p className="text-center text-zinc-600 font-semibold"><strong>Rating:</strong> ⭐⭐⭐⭐</p>
                <button
                  onClick={() => navigate(`/agent/${agent._id}`)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full w-full"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Agents;
