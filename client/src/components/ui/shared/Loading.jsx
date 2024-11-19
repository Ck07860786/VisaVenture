import React from 'react';
import backgroundImage from '../images/Herobgi.png'

function Loading() {
  return (
    <>
        <div
    className="min-h-screen w-full bg-cover bg-center text-center bg-fixed flex flex-col justify-center  p-4"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    
    <div className="flex items-center justify-center h-screen">
      <span className="loading text-black loading-dots loading-lg">loading please wait</span>
    </div>
    </div>
    </>
    
  );
}

export default Loading;
