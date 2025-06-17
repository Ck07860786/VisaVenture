import cloudinary from '../utils/cloudinary.js';
import visaApplicationModel from '../models/visaApplicationModel.js';

// Create a new visa application

export const createVisaApplication = async (req, res) => {
  try {
    const { name, email, userId, address, paymentDetails, visaType } = req.fields;
    const { passport, addressProof, passportPhoto } = req.files;

    // Validate input fields
    if (!name || !email || !address || !paymentDetails || !visaType || !passport || !addressProof || !passportPhoto) {
      return res.status(400).json({ success: false, message: 'All fields and files are required.' });
    }

    // Validate visaType
    const validVisaTypes = ['Tourist Visa', 'Student Visa', 'Business Visa', 'Work Visa'];
    if (!validVisaTypes.includes(visaType)) {
      return res.status(400).json({ success: false, message: 'Invalid visa type.' });
    }

    // Validate file existence and types
    if (!passport || !passport.path) {
      return res.status(400).json({ success: false, message: 'Passport document is missing or invalid.' });
    }
    if (!addressProof || !addressProof.path) {
      return res.status(400).json({ success: false, message: 'Address proof document is missing or invalid.' });
    }
    if (!passportPhoto || !passportPhoto.path) {
      return res.status(400).json({ success: false, message: 'Passport photo is missing or invalid.' });
    }

    // Upload files to Cloudinary
    const uploadToCloudinary = async (file, folder) => {
      try {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: folder,
          use_filename: true,
          unique_filename: true,
        });
        return uploadResult;
      } catch (error) {
        console.error(`Error uploading to Cloudinary (${folder}):`, error.message);
        throw new Error(`Error uploading ${folder} to Cloudinary`);
      }
    };

    // Upload all files
    const passportUpload = await uploadToCloudinary(passport, 'VisaVenture/PassportDocuments');
    const addressProofUpload = await uploadToCloudinary(addressProof, 'VisaVenture/AddressProofDocuments');
    const passportPhotoUpload = await uploadToCloudinary(passportPhoto, 'VisaVenture/PassportPhotos');

    // Save application to database with both public_id and secure_url for each file
    const newApplication = new visaApplicationModel({
      visaType,
      name,
      email,
      userId,
      address,
      passport: {
        public_id: passportUpload.public_id,
        url: passportUpload.secure_url,
      },
      addressProof: {
        public_id: addressProofUpload.public_id,
        url: addressProofUpload.secure_url,
      },
      passportPhoto: {
        public_id: passportPhotoUpload.public_id,
        url: passportPhotoUpload.secure_url,
      },
      paymentDetails,
    });

    // Save to database
    await newApplication.save();

    res.status(201).json({ success: true, message: 'Application submitted successfully.' });
  } catch (error) {
    console.error('Error creating visa application:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
};


// Get all visa applications for the logged-in user
export const getVisaApplications = async (req, res) => {
  try {
    const visaApplications = await visaApplicationModel.find({ userId: req.user._id });
    res.status(200).json({ success: true, data: visaApplications });
  } catch (error) {
    console.error('Error fetching visa applications:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching visa applications' });
  }
};

// Get a single visa application by ID
export const getVisaApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const visaApplication = await visaApplicationModel.findById(id);
    if (!visaApplication) {
      return res.status(404).json({ success: false, message: 'Visa application not found' });
    }
    res.status(200).json({ success: true, data: visaApplication });
  } catch (error) {
    console.error('Error fetching visa application:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching visa application' });
  }
};
