import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '@/components/ui/shared/Navbar';
import backgroundImage from '../assets/Images/Herobgi.png';
import { BASE_URL } from '@/helper/Port';
import axios from 'axios';
import { useUserAuth } from '../context/userAuth';

const VisaApplication = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userAuth, setUserAuth, ] = useUserAuth(); // Ensure userAuth context is working

  // Form state
  const [visaType, setVisaType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [passport, setPassport] = useState(null);
  const [addressProof, setAddressProof] = useState(null);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState('');

  const handleNextStep = () => {
    // Validation for each step
    if (currentStep === 1 && !visaType) {
      toast.error('Please select a visa type!');
      return;
    }
    if (currentStep === 2 && (!name || !email || !address)) {
      toast.error('Please fill all personal information fields!');
      return;
    }
    if (currentStep === 3 && (!passport || !addressProof || !passportPhoto)) {
      toast.error('Please upload all required documents!');
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!paymentDetails) {
      toast.error('Payment details are required!');
      setLoading(false);
      return;
    }

    try {
      console.log('Token:', userAuth?.token)
      console.log('UserID:', userAuth?.user?.userId)
      const formData = new FormData();
      formData.append('userId', userAuth?.user?.userId);
      formData.append('visaType', visaType);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('passport', passport);
      formData.append('addressProof', addressProof);
      formData.append('passportPhoto', passportPhoto);
      formData.append('paymentDetails', paymentDetails);

      const response = await axios.post(`${BASE_URL}/api/visa-application/visa-apply`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', 
           Authorization: `Bearer ${userAuth.token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while submitting the application.');
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="mt-36">
          <div className="min-h-screen flex flex-col items-center p-6">
            <h1 className="text-2xl font-semibold mb-4">Visa Application</h1>
            <div className="w-full max-w-lg">
              {/* Step Indicator */}
              <div className="flex justify-between mb-6">
                {['Visa Type', 'Personal Info', 'Documents', 'Payment'].map((label, index) => (
                  <div key={index} className="flex-1">
                    <div
                      className={`h-2 rounded-full ${index + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}
                    />
                    <p className={`text-center mt-2 ${index + 1 === currentStep ? 'font-semibold' : ''}`}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="bg-transparent p-6 rounded-lg shadow-lg backdrop-blur-md"
                  >
                    <h2 className="text-xl font-medium mb-4">Step 1: Select Visa Type</h2>
                    <select
                      value={visaType}
                      onChange={(e) => setVisaType(e.target.value)}
                      className="w-full p-2 bg-transparent border rounded-md mb-4"
                    >
                      <option value="" disabled>Select Visa Type</option>
                      <option value="Tourist Visa">Tourist Visa</option>
                      <option value="Student Visa">Student Visa</option>
                      <option value="Business Visa">Business Visa</option>
                      <option value="Work Visa">Work Visa</option>
                    </select>
                    <Button onClick={handleNextStep}>Next</Button>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="bg-transparent p-6 rounded-lg shadow-lg backdrop-blur-md"
                  >
                    <h2 className="text-xl font-medium mb-4">Step 2: Personal Information</h2>
                    <form>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent p-2 border rounded-md mb-4"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent p-2 border rounded-md mb-4"
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-transparent p-2 border rounded-md mb-4"
                      />
                      <Button onClick={handleNextStep}>Next</Button>
                    </form>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="bg-transparent p-6 rounded-lg shadow-lg backdrop-blur-md"
                  >
                    <h2 className="text-xl font-medium mb-4">Step 3: Upload Documents</h2>
                    <input
                      type="file"
                      onChange={(e) => setPassport(e.target.files[0])}
                      accept="application/pdf,image/*"
                      className="w-full p-2 mb-4"
                    />
                    <input
                      type="file"
                      onChange={(e) => setAddressProof(e.target.files[0])}
                      accept="application/pdf,image/*"
                      className="w-full p-2 mb-4"
                    />
                    <input
                      type="file"
                      onChange={(e) => setPassportPhoto(e.target.files[0])}
                      accept="image/*"
                      className="w-full p-2 mb-4"
                    />
                    <Button onClick={handleNextStep}>Next</Button>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="bg-transparent p-6 rounded-lg shadow-lg backdrop-blur-md"
                  >
                    <h2 className="text-xl font-medium mb-4">Step 4: Payment</h2>
                    <input
                      type="text"
                      placeholder="Payment Information"
                      value={paymentDetails}
                      onChange={(e) => setPaymentDetails(e.target.value)}
                      className="w-full p-2 mb-4"
                    />
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className={`w-full text-white bg-blue-500 py-2 rounded-md ${loading ? 'cursor-not-allowed' : ''}`}
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisaApplication;
