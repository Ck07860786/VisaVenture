import mongoose from "mongoose";

const agentKycSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Agent",
  },
  name:{
    type:String,
    required:true,
  },
  email:{

    type:String,
    required:true,

  },
 
  country: {
    type: String,
    required: true,
  },
  personalDocuments: {
    identityProof: {
      public_id: { type: String },
      url: { type: String },
     
    },
    profileImage:{
      public_id:{type:String},
      url:{type:String},

    },
    personalDetailsSubmitted: { type: Boolean, default: false },
  },
  businessDocuments: {
    iataCertificate: {
      public_id: { type: String },
      url: { type: String },
      
    },
    policeClearanceCertificate: {
      public_id: { type: String },
      url: { type: String },
   
    },
    businessRegistrationCertificate: {
      public_id: { type: String },
      url: { type: String },
     
    },
    previousRecords: {
      public_id: { type: String },
      url: { type: String },
    
    },
    businessDetailsSubmitted: { type: Boolean, default: false },
  },
  kycStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

export default mongoose.model("AgentKYC", agentKycSchema);






