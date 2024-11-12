import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import agentModel from '../models/agentModel.js';

export const requireSignIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({ 
                success: false, 
                message: 'Authorization header missing or incorrectly formatted.' 
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Token not provided.',
            });
        }

        const decode = JWT.verify(token, process.env.JWT_KEY);
        const user = await userModel.findById(decode._id); // Check if it's a user
        const agent = await agentModel.findById(decode._id); // Check if it's an agent

        // Check if user or agent is found
        if (!user && !agent) {
            return res.status(404).send({
                success: false,
                message: 'User or Agent not found.',
            });
        }

        // Attach user or agent information to the request
        if (user) {
            req.user = user; // Attach user information
        }
        if (agent) {
            req.agent = agent; // Attach agent information
        }

        console.log('User or Agent:', req.user || req.agent); // Debugging: log the user or agent information

        next();
    } catch (error) {
        console.error('Error in requireSignIn middleware:', error);
        return res.status(401).send({
            success: false,
            message: 'Authorization failed. Invalid or expired token.',
            error: error.message,
        });
    }
};



// Middleware to check if the user is an admin
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id); // Use req.user set in requireSignIn
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found.',
            });
        }
        if (user.role !== 'admin') { // Check if the role is 'admin'
            return res.status(403).send({
                success: false,
                message: 'Unauthorized Access - Admins Only',
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Server Error',
        });
    }
};

// Middleware to check if the user is an agent
export const isAgent = async (req, res, next) => {
    try {
        const agent = await agentModel.findById(req.agent._id); // Use req.user set in requireSignIn
        if (!agent) {
            return res.status(404).send({
                success: false,
                message: 'Agent not found.',
            });
        }
        if (agent.role !== 'agent') { // Check if the role is 'agent'
            return res.status(403).send({
                success: false,
                message: 'Unauthorized Access - Agents Only',
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Server Error',
        });
    }
};

// Middleware to check if the user is a regular user
export const isUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id); // Use req.user set in requireSignIn
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found.',
            });
        }
        if (user.role !== 'user') { // Check if the role is 'user'
            return res.status(403).send({
                success: false,
                message: 'Unauthorized Access - Users Only',
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Server Error',
        });
    }
};
