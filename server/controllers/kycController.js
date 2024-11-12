import agentKycModel from "../models/agentKycModel.js";
import agentModel from "../models/agentModel.js";
import cloudinary from "../utils/cloudinary.js"; 

export const submitPersonalDetailsController = async (req, res) => {
  try {
    const { name, email, agentId, country } = req.fields;
    const personalDocument = req.files.personalDocument.path;
    const profileImage = req.files.profileImage?.path;

    // Check that all required fields are provided
    if (!name || !email || !agentId || !country || !personalDocument) {
      return res.status(400).send({
        success: false,
        message: 'All fields are required: name, email, agentId, country, and personalDocument.',
      });
    }

    // Upload personal document to Cloudinary
    const personalDocResult = await cloudinary.uploader.upload(personalDocument, {
      folder: 'VisaVenture',
      use_filename: true,
    });

    let profileImageResult;
    if (profileImage) {
      profileImageResult = await cloudinary.uploader.upload(profileImage, {
        folder: 'VisaVenture/ProfileImages',
        use_filename: true,
      });
    }

    // Find existing KYC data or create a new one if not found
    let kycData = await agentKycModel.findOne({ agentId });

    if (!kycData) {
      kycData = new agentKycModel({
        name,
        email,
        agentId,
        country,
        personalDocuments: {
          identityProof: {
            public_id: personalDocResult.public_id,
            url: personalDocResult.secure_url,
          },
          profileImage: profileImageResult ? {
            public_id: profileImageResult.public_id,
            url: profileImageResult.secure_url,
          } : null,
          personalDetailsSubmitted: true,
        },
      });
    } else {
      // Update existing KYC data
      kycData.personalDocuments.identityProof = {
        public_id: personalDocResult.public_id,
        url: personalDocResult.secure_url,
      };
      if (profileImageResult) {
        kycData.personalDocuments.profileImage = {
          public_id: profileImageResult.public_id,
          url: profileImageResult.secure_url,
        };
      }
      kycData.personalDocuments.personalDetailsSubmitted = true; // Mark as submitted
    }

    await kycData.save(); // Save the KYC data

    // Instead of marking the entire KYC as submitted, just confirm personal details submission
    res.status(200).send({
      success: true,
      message: 'Personal details submitted successfully. Please proceed to submit business details.',
    });
  } catch (error) {
    console.log('Error in submitPersonalDetailsController:', error);
    return res.status(500).send({
      success: false,
      message: 'Error submitting personal details',
      error: error.message,
    });
  }
};

// Submit Business Details
// Submit Business Details
export const submitBusinessDetailController = async (req, res) => {
  try {
    const { agentId } = req.fields;
    const { iataCertificate, policeClearanceCertificate, businessRegistrationCertificate, previousRecords } = req.files;

    // Check if agentId is provided
    if (!agentId) {
      return res.status(400).send({
        success: false,
        message: 'Agent ID is required.',
      });
    }

    console.log('Agent ID received:', agentId); // Log agentId for debugging

    // Find the agent using agentId
    const agent = await agentModel.findById(agentId); // Assuming agentId is an ObjectId
    if (!agent) {
      return res.status(404).send({
        success: false,
        message: 'Agent not found',
      });
    }

    
    console.log('Agent found:', agent); // Log agent details for debugging

    // Find existing KYC data for the agent
    const kycData = await agentKycModel.findOne({ agentId });
    if (!kycData || !kycData.personalDocuments.personalDetailsSubmitted) {
      return res.status(400).send({
        success: false,
        message: 'Personal details must be submitted before business details.',
      });
    }

    // Upload business documents to Cloudinary
    const iataResult = await cloudinary.uploader.upload(iataCertificate.path, {
      folder: 'KYC/Documents/IATA',
      use_filename: true,
    });

    const policeClearanceResult = await cloudinary.uploader.upload(policeClearanceCertificate.path, {
      folder: 'KYC/Documents/PoliceClearance',
      use_filename: true,
    });
    const previousRecordsResult = await cloudinary.uploader.upload(previousRecords.path, {
      folder: 'KYC/Documents/previousRecords',
      use_filename: true,
    });

    const businessRegistrationResult = await cloudinary.uploader.upload(businessRegistrationCertificate.path, {
      folder: 'KYC/Documents/BusinessRegistration',
      use_filename: true,
    });

    // Update business documents in the existing KYC record
    kycData.businessDocuments = {
      iataCertificate: {
        public_id: iataResult.public_id,
        url: iataResult.secure_url,
      },
      policeClearanceCertificate: {
        public_id: policeClearanceResult.public_id,
        url: policeClearanceResult.secure_url,
      },
      previousRecords: {
        public_id: previousRecordsResult.public_id,
        url: previousRecordsResult.secure_url,
      },
      businessRegistrationCertificate: {
        public_id: businessRegistrationResult.public_id,
        url: businessRegistrationResult.secure_url,
      
      },
     
      businessDetailsSubmitted: true,
    };

    await kycData.save();
    agent.isKycSubmitted = true; // Mark agent KYC as submitted
    await agent.save();

    res.status(200).send({
      success: true,
      message: 'KYC details submitted successfully',
      agentKyc: kycData, // Return the updated KYC data if needed
    });
  } catch (error) {
    console.log('Error in submitBusinessDetailController:', error); // Log error for debugging
    return res.status(500).send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};



// Approve or Reject Agent KYC by Admin
export const updateKycStatus = async (req, res) => {
  try {
    const { kycId, status } = req.body;

    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Update KYC status
    const updatedKyc = await agentKycModel.findByIdAndUpdate(
      kycId,
      { kycStatus: status },
      { new: true }
    );

    if (!updatedKyc) {
      return res.status(404).json({ message: 'KYC not found' });
    }

    return res.status(200).json({
      message: `KYC ${status} successfully`,
      data: updatedKyc,
    });
  } catch (error) {
    console.log('Error in updateKycStatus:', error); // Log error for debugging
    return res.status(500).json({ message: 'Error updating KYC status', error });
  }
};


export const getAllKycController = async(req,res)=>{
  
  try {

    const kyc = await agentKycModel.find({})

    res.json(kyc)

    


    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"error in fetching the kyc"
    })
  }
}


export const getKycStatusController = async (req, res) => {
  try {
      const agentId = req.agent; // Get the agent ID from the request

      const agentKyc = await agentKycModel.findOne({ agentId });

      if (!agentKyc) {
          return res.status(404).json({
              success: false,
              message: 'KYC record not found. Please submit your KYC.',
          });
      }

      res.status(200).json({
          success: true,
          kycStatus: agentKyc.kycStatus,
          message: agentKyc.kycStatus === 'pending'
              ? 'Your KYC is under review.'
              : agentKyc.kycStatus === 'approved'
              ? 'Your KYC has been approved.'
              : 'Your KYC has been rejected. Please resubmit.',
      });
      
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
  }
};





