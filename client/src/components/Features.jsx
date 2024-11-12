import React from "react";
import { Users, Nfc, MonitorSmartphone, SquareMousePointer, Globe, TicketPercent, Fingerprint, MapPinned, BadgeCheck } from "lucide-react";

function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
      <div className="max-w-xs flex items-start flex-col">
        <div className="bg-primary text-white rounded-full p-4 mb-4 flex justify-center items-center shadow-lg w-14 h-14">
          <Users strokeWidth={1} className="size-12" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold mb-2">User-Friendly Registration</h3>
          <p className="text-gray-400 mb-4">
            Easily sign up and create your profile and start your visa application.
          </p>
          <a href="#" className="text-blue-500">
            Learn more &rarr;
          </a>
        </div>
      </div>

      <div className="max-w-xs flex items-start flex-col">
        <div className="bg-primary text-white rounded-full p-4 mb-4 flex justify-center items-center shadow-lg w-14 h-14">
          <Globe strokeWidth={1} className="size-12" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold mb-2">Global Agent Network</h3>
          <p className="text-gray-400 mb-4">
          More verified agents from around the world, offering greater choice and expertise.
          </p>
          <a href="#" className="text-blue-500">
            Learn more &rarr;
          </a>
        </div>
      </div>

      <div className="max-w-xs flex items-start flex-col">
        <div className="bg-primary text-white rounded-full p-4 mb-4 flex justify-center items-center  shadow-lg w-14 h-14">
          <MapPinned strokeWidth={1} className="size-12" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold mb-2">Multi-Country Visa Applications</h3>
          <p className="text-gray-400 mb-4">
          Apply for multiple visas in one streamlined process for complex travel plans.
          </p>
          <a href="#" className="text-blue-500">
            Learn more &rarr;
          </a>
        </div>
      </div>

      <div className="max-w-xs flex items-start flex-col">
        <div className="bg-primary text-white rounded-full p-4 mb-4 flex justify-center items-center shadow-lg w-14 h-14">
          <BadgeCheck strokeWidth={1} className="size-12" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold mb-2">KYC-Verified Agents</h3>
          <p className="text-gray-400 mb-4">
          Work only with trusted, KYC-verified agents for secure and reliable service.
          </p>
          <a href="#" className="text-blue-500">
            Learn more &rarr;
          </a>
        </div>
      </div>

      <div className="max-w-xs flex items-start flex-col">
        <div className="bg-primary text-white rounded-full p-4 mb-4 flex justify-center items-center shadow-lg w-14 h-14">
          <TicketPercent strokeWidth={1} className="size-12" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold mb-2">Seamless Booking and Scheduling</h3>
          <p className="text-gray-400 mb-4">
            Book and schedule sessions with ease and at your convenience.
          </p>
          <a href="#" className="text-blue-500">
            Learn more &rarr;
          </a>
        </div>
      </div>

      <div className="max-w-xs flex items-start flex-col">
        <div className="bg-primary text-white rounded-full p-4 mb-4 flex justify-center items-center shadow-lg w-14 h-14">
          <Fingerprint strokeWidth={1} className="size-12" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold mb-2">Secure Payment Processing</h3>
          <p className="text-gray-400 mb-4">
            Handle payments securely through our integrated payment gateway.
          </p>
          <a href="#" className="text-blue-500">
            Learn more &rarr;
          </a>
        </div>
      </div>

      <div className="max-w-xs flex items-start flex-col">
        <div className="bg-primary text-white rounded-full p-4 mb-4 flex justify-center items-center shadow-lg w-14 h-14">
          <Nfc strokeWidth={1} className="size-12" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold mb-2">Real-Time Communication</h3>
          <p className="text-gray-400 mb-4">
          Users and agents can communicate instantly for faster responses and updates.
          </p>
          <a href="#" className="text-blue-500">
            Learn more &rarr;
          </a>
        </div>
      </div>

      <div className="max-w-xs flex items-start flex-col">
        <div className="bg-primary text-white rounded-full  p-4 mb-4 flex justify-center items-center shadow-lg w-14 h-14">
          <MonitorSmartphone strokeWidth={1} className="size-12" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold mb-2">Responsive Design</h3>
          <p className="text-gray-400 mb-4">
            Access VisaVenture seamlessly on any device, be it desktop, tablet, or smartphone.
          </p>
          <a href="#" className="text-blue-500">
            Learn more &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

export default Features;
