import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { BASE_URL } from '@/helper/Port';
import Navbar from '@/components/ui/shared/Navbar';
import backgroundImage from '../assets/Images/Herobgi.png';

// Initialize Socket.io connection
const socket = io(BASE_URL);

const Chat = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [agents, setAgents] = useState([]);
  const [activeAgent, setActiveAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  // Fetch all agents
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/kyc/agent/all-kyc`);
        const data = await response.json();
        setAgents(data.filter(agent => agent.kycStatus === 'approved'));
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // Fetch user profile
  useEffect(() => {
    setUserProfile({
      name: 'John Doe',
      profileImage: '/path/to/profile-image.jpg',
    });
  }, []);

  // Fetch chat history when an agent is selected
  useEffect(() => {
    if (agentId) {
      fetchMessages(agentId);
      socket.emit('join_room', agentId);

      socket.on('receive_message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [agentId]);

  const fetchMessages = async (agentId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/chat/${agentId}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      const messageData = {
        roomId: agentId,
        sender: userProfile.name,
        text: message,
      };

      await fetch(`${BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage('');
    }
  };

  const selectAgent = (agent) => {
    setActiveAgent(agent);
    navigate(`/chat/${agent._id}`);
    setMessages([]);
  };

  if (loading) return <div>Loading agents...</div>;
  if (agents.length === 0) return <div>No agents available</div>;

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        {/* Left Panel: Agent List */}
        <div className="w-1/3 bg-transparent mt-16 shadow-md border-r p-4 overflow-y-auto">
          <div className="space-y-4">
            {agents.map((agent, index) => (
              <div key={agent._id} className="relative">
                <div
                  onClick={() => selectAgent(agent)}
                  className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg"
                >
                  <img
                    src={agent.personalDocuments?.profileImage?.url || '/placeholder-image.jpg'}
                    alt={agent.name}
                    className="w-12 h-12 object-cover rounded-full shadow-md mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{agent.name}</h3>
                    <p className="text-sm text-gray-500">{agent.country}</p>
                  </div>
                </div>
                
                {/* Fade line below each profile except the last one */}
                {index < agents.length - 1 && (
                  <div className="absolute bottom-0 left-12 w-[85%] h-[1px] bg-gradient-to-r from-gray-200 via-gray-400 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Chat Interface */}
        <div
          className="w-2/3 h-screen flex flex-col bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {activeAgent && (
            <div className="flex flex-col h-full mt-14 bg-opacity-80 p-4 shadow-lg">
              {/* Chat Header */}
              <div className="flex items-center space-x-4 p-2 border-b shadow-md mt-2 rounded-lg">
                <img
                  src={activeAgent?.personalDocuments?.profileImage?.url || '/placeholder-image.jpg'}
                  alt={activeAgent.name}
                  className="w-12 h-12 object-cover rounded-full shadow-md"
                />
                <div>
                  <h2 className="text-2xl font-bold">{activeAgent.name}</h2>
                  <p className="text-sm text-gray-500">{activeAgent.country}</p>
                </div>
              </div>

              {/* Chat History */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === userProfile.name ? 'justify-end' : 'justify-start'} space-x-4`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-xs shadow-md ${
                        msg.sender === userProfile.name ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Send Message Input */}
              <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow p-2 bg-white border border-gray-300 rounded-lg"
                />
                <button
                  onClick={sendMessage}
                  className="ml-4 bg-blue-500 text-white p-2 rounded-lg"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
