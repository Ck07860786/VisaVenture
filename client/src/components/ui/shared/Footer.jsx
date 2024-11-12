import React from 'react';
import { Facebook, Github, Instagram, Twitter, Youtube } from 'lucide-react';


const Footer = () => {
  return (
    <footer className=" bg-primary text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      
        <div className="col-span-1">
          <div className="flex items-center mb-5">
           <h1 className=' text-3xl font-bold'>Visa<span className=' text-blue-900 '>Venture</span></h1>
          </div>
          <p className=' font-normal text-zinc-300'>
            Making the visa process easier through connecting users with KYC-verified agents worldwide.
          </p>
         
          <div className="flex space-x-4 mt-5 text-zinc-400 font-normal">
            <Facebook/>
            <Instagram/>
            <Twitter/>
            <Github/>
            <Youtube/>
          </div>
        </div>

        
        <div>
          <h3 className="font-semibold mb-4">Solutions</h3>
          <ul className=' font-normal text-zinc-400'>
            <li><a href="#" className="hover:underline">Visa Application</a></li>
            <li><a href="#" className="hover:underline">Agent Services</a></li>
            <li><a href="#" className="hover:underline">Multi-Country Visas</a></li>
            <li><a href="#" className="hover:underline">Real-Time Tracking</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className=' font-normal text-zinc-400'>
            <li><a href="#" className="hover:underline">Pricing</a></li>
            <li><a href="#" className="hover:underline">Documentation</a></li>
            <li><a href="#" className="hover:underline">Guides</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className=' font-normal text-zinc-400'>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-zinc-500">
        <p>© 2024 VisaVenture. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
