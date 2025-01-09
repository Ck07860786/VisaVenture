import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserAuth } from '@/context/userAuth';
 // Assuming useUserAuth is your custom hook for user authentication

const Messages = () => {
    const [messages, setMessages] = useState([]);
  ; // Get userAuth context
    const { userId } = useUserAuth(); // Extract userId from context

    useEffect(() => {
        // Ensure userId is available before making the request
        if (!userId) {
            console.error('User ID is missing');
            return; // Prevent fetching if userId is not available
        }

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/messages/${userId}`);
                setMessages(response.data); // Store messages in state
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [userId]); // Only fetch messages if userId changes

    // Loading state if userId is missing
    if (!userId) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message._id}>
                        <p>{message.text}</p>
                    </div>
                ))
            ) : (
                <p>No messages available.</p>
            )}
        </div>
    );
};

export default Messages;
