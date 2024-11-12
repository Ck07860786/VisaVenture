import { BASE_URL } from '@/helper/Port';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth'; // Import the useAuth hook
import Navbar from '@/components/ui/shared/Navbar';
import AgentDashboard from './AgentDashboard';
import KycSubmitted from '@/components/ui/shared/KycSubmitted';
import KycRejected from '@/components/ui/shared/KycRejected';
import { useNavigate } from 'react-router-dom';

const KYCVerification = () => {
   
    //api for countries

    const [countries,setCountries] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [kycStatus,setKycStatus] = useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
     const res= axios.get('https://restcountries.com/v3.1/all?fields=name,flags')
     .then((res)=>{
      const countryNames = res.data.map((country) => country.name.common);
      setCountries(countryNames),
      console.log(countryNames)
     })
      

      
    },[]);

    const handleSelectCountry = (selectedCountry) => {
      setCountry(selectedCountry); // Update the input field with the selected country
      setShowSuggestions(false); // Hide the suggestions after selection
    };
  

  const [step, setStep] = useState(1);
  const [waiting, setWaiting] = useState(false);
  const [personalKycSubmitted, setPersonalKycSubmitted] = useState(false);
  const [businessKycSubmitted, setBusinessKycSubmitted] = useState(false);

  // Personal details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [personalDocument, setPersonalDocument] = useState(null);
  const [profileImage, setProfileImage] = useState(null);



  
 
 

  // Business documents
  const [iataCertificate, setIataCertificate] = useState(null);
  const [policeClearanceCertificate, setPoliceClearanceCertificate] = useState(null);
  const [businessRegistrationCertificate, setBusinessRegistrationCertificate] = useState(null);
  const [previousRecords, setPreviousRecords] = useState(null);
  const [confirm, setConfirm] = useState(false);

  // Use Auth Context to get user and token
  const [auth] = useAuth();


  

  // Step validation and navigation
  const handleNextStep = async () => {
  
    

    if (step === 1) {
      if (!name || !email || !country || !documentType || !personalDocument) {
        alert('Please fill out all personal details and upload the document.');
        return;
      }
      await handlePersonalKycSubmit();
    } else if (step === 2) {
      if (
        !iataCertificate ||
        !policeClearanceCertificate ||
        !businessRegistrationCertificate ||
        !previousRecords ||
        !confirm
      ) {
        alert('Please upload all required business documents and confirm.');
        return;
      }
      await handleBusinessKycSubmit();
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  
  // Personal KYC submission
  const handlePersonalKycSubmit = async () => {
    const formData = new FormData();
    formData.append('agentId', auth?.agentId);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('country', country);
    formData.append('documentType', documentType);
    formData.append('personalDocument', personalDocument);
    formData.append('profileImage', profileImage);
    

    setWaiting(true);

    try {
      console.log('Token:', auth.token); // Correctly logging the token
      const response = await axios.post(`${BASE_URL}/api/kyc/agent/submit-personal-details`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`, // Pass the token here
        },
      });
  
      console.log('Personal KYC Response:', response.data);
      
      setWaiting(false);
      setPersonalKycSubmitted(true);
      setStep(2); // Move to the next step after successful submission
    } catch (error) {
      setWaiting(false);
      console.error('Personal KYC Submission Error:', error.response ? error.response.data : error.message);
      alert('Error submitting personal KYC. Please try again.');
    }
};

  // Business KYC submission
  const handleBusinessKycSubmit = async () => {
    const formData = new FormData();
    formData.append('agentId',auth?.agentId)
    formData.append('iataCertificate', iataCertificate);
    formData.append('policeClearanceCertificate', policeClearanceCertificate);
    formData.append('businessRegistrationCertificate', businessRegistrationCertificate);
    formData.append('previousRecords', previousRecords);

    setWaiting(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/kyc/agent/submit-business-details`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`, // Pass the token here
        },
      });
      // Log the response for debugging
      console.log('Business KYC Response:', response.data);

      setWaiting(false);
      setBusinessKycSubmitted(true);
      setStep(3); // Move to final step after business KYC submission
    } catch (error) {
      setWaiting(false);
      console.error('Business KYC Submission Error:', error.response || error.message);
      alert('Error submitting business KYC. Please try again. Check the console for more details.');
    }
  };



  const fetchKycStatus = async()=>{
   

    try {
     const {data} = await axios.get(`${BASE_URL}/api/kyc/agent/kyc-status`);
     setKycStatus(data.kycStatus)
     
    } catch (error) {
     console.log('Error fetching kyc status',error)
     
    }
   }

     useEffect(() => {
   if(auth.token) fetchKycStatus();
  });

 // Empty array to run only on mount
  
  if(KycSubmitted && businessKycSubmitted && businessKycSubmitted && kycStatus==='pending')
    
  {
    navigate('/kyc-submitted')
  }
  

  

  if (kycStatus === "approved") 
    return (
      
      <AgentDashboard/>
       
      
    );
  

   if (kycStatus === "rejected") 
    return (
     
     <KycRejected/>
     
     
    );


  return (
    <>
    <Navbar/>
    <div className="relative flex items-center justify-center bg-gray-100 py-20 bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: 'url(https://cdn.dribbble.com/userupload/5016874/file/original-05dc19ca9ae458780d564b7e771cc24f.png?resize=1905x1429)',
          filter: 'blur(8px)',
        }}
      />

      <div className="w-full max-w-4xl bg-white p-10 rounded-lg shadow-md relative z-10">
        <h1 className="text-3xl font-semibold mb-6 text-center">KYC Verification</h1>

        {waiting ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Submitting...</h2>
            <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : personalKycSubmitted && businessKycSubmitted ? (
          <div className="text-center">
            <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/128/7264/7264008.png" alt="verification" />
            <h2 className="text-2xl font-bold mb-2">KYC Submitted Successfully</h2>
            <p className="text-gray-500">
              Your KYC has been submitted successfully. It is under review and will be approved within 24-48 hours. You will be notified once your verification is complete.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center space-x-4 mb-10">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex flex-col items-center">
                  <div className={`h-4 w-4 ${step >= stepNum ? 'bg-blue-600' : 'bg-gray-300'} rounded-full`} />
                  <p className={`mt-2 ${step >= stepNum ? 'text-blue-600' : 'text-gray-500'}`}>Step {stepNum}</p>
                </div>
              ))}
            </div>

            <form className="space-y-6">
              {step === 1 && (
                <>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
                    <p className="text-gray-500">Please provide your personal details and upload a valid identity document.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Personal Details Input */}
                    <div>
                      <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg"
                        required
                      />
                    </div>
                    <div className="relative">
      <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country</label>
      <input
        type="text"
        id="country"
        value={country} // Input value bound to country state
        onChange={(e) => {
          setCountry(e.target.value); // Update state when user types
          setShowSuggestions(true); // Show suggestions while typing
        }}
        className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg"
        required
      />
      
      {/* Suggestions dropdown */}
      {showSuggestions && country && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto rounded-lg">
          {countries
            .filter((c) => c.toLowerCase().includes(country.toLowerCase())) 
            .slice(0, 10) 
            .map((filteredCountry, index) => (
              <li
                key={index}
                onClick={() => handleSelectCountry(filteredCountry)} 
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {filteredCountry}
              </li>
            ))}
        </ul>
      )}
    </div>
                    <div>
                      <label htmlFor="documentType" className="block mb-2 text-sm font-medium text-gray-900">Document Type</label>
                      <select
                        id="documentType"
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg"
                        required
                      >
                        <option value="">Select Document Type</option>
                        <option value="passport">Passport</option>
                        <option value="nationalId">National ID</option>
                        <option value="driverLicense">Driver's License</option>
                      </select>
                    </div>
                    <div className=' flex  gap-4'>

                    </div>
                    <div className="col-span-2">
                      <label htmlFor="personalDocument" className="block mb-2 text-sm font-medium text-gray-900">Upload Document</label>
                      <input
                        type="file"
                        id="personalDocument"
                        onChange={(e) => setPersonalDocument(e.target.files[0])}
                        className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="personalDocument" className="block mb-2 text-sm font-medium text-gray-900">Upload Profile Image</label>
                      <input
                        type="file"
                        id="profileImage"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                        className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Business Information</h2>
                    <p className="text-gray-500">Please provide your business details and upload the required documents.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Business Documents Input */}
                    <div>
                      <label htmlFor="iataCertificate" className="block mb-2 text-sm font-medium text-gray-900">IATA Certificate</label>
                      <input
                        type="file"
                        id="iataCertificate"
                        onChange={(e) => setIataCertificate(e.target.files[0])}
                        className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="policeClearanceCertificate" className="block mb-2 text-sm font-medium text-gray-900">Police Clearance Certificate</label>
                      <input
                        type="file"
                        id="policeClearanceCertificate"
                        onChange={(e) => setPoliceClearanceCertificate(e.target.files[0])}
                        className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="businessRegistrationCertificate" className="block mb-2 text-sm font-medium text-gray-900">Business Registration Certificate</label>
                      <input
                        type="file"
                        id="businessRegistrationCertificate"
                        onChange={(e) => setBusinessRegistrationCertificate(e.target.files[0])}
                        className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="previousRecords" className="block mb-2 text-sm font-medium text-gray-900">Previous Records (if any)</label>
                      <input
                        type="file"
                        id="previousRecords"
                        onChange={(e) => setPreviousRecords(e.target.files[0])}
                        className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          id="confirm"
                          checked={confirm}
                          onChange={(e) => setConfirm(e.target.checked)}
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        />
                        <label htmlFor="confirm" className="text-sm font-medium text-gray-900">I confirm that the information provided is accurate and up-to-date.</label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                {step > 1 && (
                  <button type="button" onClick={handlePreviousStep} className="py-3 px-6 bg-gray-200 text-gray-800 rounded-lg">
                    Previous
                  </button>
                )}
                <button type="button" onClick={handleNextStep} className="py-3 px-6 bg-blue-600 text-white rounded-lg">
                  {step === 2 ? 'Submit KYC' : 'Next'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default KYCVerification;

