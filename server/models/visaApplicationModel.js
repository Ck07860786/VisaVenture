import mongoose from 'mongoose';

const visaApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  visaType: {
    type: String,
    required: true,
    enum: ['Tourist Visa', 'Student Visa', 'Business Visa', 'Work Visa'],
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  passport: {
  
      public_id: { type: String, required: true },
      url: { type: String, required: true },
   
  },
  addressProof: {
    
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    
  
  },
  passportPhoto: {
   
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    
   
  },
  paymentDetails: {
    type: String,
    required: true,
  },
}, { timestamps: true });


export default mongoose.model('VisaApplication', visaApplicationSchema);
