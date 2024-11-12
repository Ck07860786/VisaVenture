import mongoose from "mongoose";

const agentModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isKycSubmitted: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['agent', 'user', 'admin'],
        default: 'agent',
    },
    kycStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    created_At: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('agent', agentModel);






