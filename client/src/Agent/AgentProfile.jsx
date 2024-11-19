import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/helper/Port';
import toast from 'react-hot-toast';
import { MdVerified } from "react-icons/md";
import Spinner from '@/components/ui/shared/Spinner';
import Loading from '@/components/ui/shared/Loading';

const AgentProfile = () => {
  const { agentId } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the specific agent's profile data
  const fetchAgentProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/kyc/agent/all-kyc`);
      const agentData = response.data.find(agent => agent._id === agentId);

      if (agentData) {
        setAgent(agentData);
      } else {
        toast.error('Agent not found');
      }
    } catch (error) {
      console.error('Error fetching agent profile:', error);
      toast.error('Failed to load agent profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentProfile();
  }, [agentId]);
  const handleChatNow = () => {
    navigate(`/chat/${agentId}`);
  };

  const handleApplyVisa = () => {
    navigate(`/apply-visa/${agentId}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loading/></div>;
  }

  if (!agent) {
    return <div className="flex justify-center items-center h-screen">Agent profile not found</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Header Section */}
      <div className="relative w-full h-64 bg-blue-500">
        <img
          src={agent.personalDocuments?.coverImage?.url || '/cover-placeholder.jpg'}
          alt="Cover"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 w-full flex items-center justify-center py-4 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex flex-col items-center">
            <img
              src={agent.personalDocuments?.profileImage?.url || '/profile-placeholder.jpg'}
              alt={agent.name}
              className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg"
            />
            <h2 className="mt-4 text-2xl font-semibold text-white flex items-center">
              {agent.name} <MdVerified className="ml-2 text-blue-300" />
            </h2>
            <p className="text-white">{agent.country}</p>
          </div>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="container mx-auto mt-8 px-4 lg:px-24 flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="lg:w-1/3 w-full p-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p><strong>Email:</strong> {agent.email}</p>
            <p><strong>Phone:</strong> {agent.phone || 'N/A'}</p>
            <p><strong>Country:</strong> {agent.country}</p>
            <div className="flex flex-col mt-6">
              <button
                onClick={handleChatNow}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full mb-4"
              >
                Chat Now
              </button>
              <button
                onClick={handleApplyVisa}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full"
              >
                Apply Visa
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">KYC Status</h3>
            <p>
              <strong>Status:</strong> {agent.kycStatus === 'approved' ? (
                <span className="text-green-500">Approved</span>
              ) : (
                <span className="text-red-500">{agent.kycStatus}</span>
              )}
            </p>
            <p><strong>Business Submitted:</strong> {agent.businessDocuments?.businessDetailsSubmitted ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-2/3 w-full p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4">About {agent.name}</h3>
            <p className="text-gray-700 mb-4">
              {/* Example description, you can replace this with dynamic data if available */}
              Experienced travel agent specialized in visa consultancy with a strong track record of successful applications. Skilled in handling different visa categories and providing tailored guidance to clients worldwide.
            </p>

            <h3 className="text-xl font-semibold mb-4">Business Documents</h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                <strong>IATA Certificate:</strong>{' '}
                {agent.businessDocuments?.iataCertificate?.url ? (
                  <a href={agent.businessDocuments.iataCertificate.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View</a>
                ) : (
                  'Not Uploaded'
                )}
              </li>
              <li>
                <strong>Police Clearance:</strong>{' '}
                {agent.businessDocuments?.policeClearanceCertificate?.url ? (
                  <a href={agent.businessDocuments.policeClearanceCertificate.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View</a>
                ) : (
                  'Not Uploaded'
                )}
              </li>
              <li>
                <strong>Business Registration:</strong>{' '}
                {agent.businessDocuments?.businessRegistrationCertificate?.url ? (
                  <a href={agent.businessDocuments.businessRegistrationCertificate.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View</a>
                ) : (
                  'Not Uploaded'
                )}
              </li>
              <li>
                <strong>Previous Records:</strong>{' '}
                {agent.businessDocuments?.previousRecords?.url ? (
                  <a href={agent.businessDocuments.previousRecords.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View</a>
                ) : (
                  'Not Uploaded'
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
