import React from 'react'
import Navbar from './Navbar'

function kycRejected() {
  return (
    <>
    <Navbar/>
      <div className="text-center mt-60">
            <img className="mx-auto w-40" src="https://cdn.pixabay.com/photo/2017/10/16/21/51/rejected-2858656_1280.png" alt="Rejection" />
            <h2 className="text-2xl font-bold mb-2">KYC Rejected</h2>
            <p className="text-gray-500">
            Your KYC was rejected. Please contact support or re-submit your details.
            </p>
          </div>
    </>
  )
}

export default kycRejected