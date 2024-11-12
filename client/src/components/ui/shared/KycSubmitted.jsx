import React from 'react'
import Navbar from './Navbar'

function KycSubmitted() {
  return (
    <>
    <Navbar/>
     <div className="text-center mt-60">
            <img className="mx-auto" src="https://cdn-icons-png.flaticon.com/128/7264/7264008.png" alt="verification" />
            <h2 className="text-2xl font-bold mb-2">KYC Submitted Successfully</h2>
            <p className="text-gray-500">
              Your KYC has been submitted successfully. It is under review and will be approved within 24-48 hours. You will be notified once your verification is complete.
            </p>
          </div>
    </>
  )
}

export default KycSubmitted