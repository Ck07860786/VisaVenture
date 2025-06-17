import React from 'react';
import Navbar from '@/components/ui/shared/Navbar';
import backgroundImage from '../assets/Images/Herobgi.png'; // Update the path to your image
import { Button } from '@/components/ui/button';
import Questions from '@/components/ui/shared/Questions';
import BlurIn from '@/components/magicui/blur-in';
import { FadeText } from '@/components/magicui/fade-text';
import LetterPullup from '@/components/magicui/letter-pullup';
import Reviewers from '@/components/Alumanies';
import Collaborations from '@/components/Collaborations';
import Contributors from '@/components/Contributors';
import Features from '@/components/Features';
import Footer from '@/components/ui/shared/Footer';
import { AnimatedShinyTextDemo } from '@/components/Comingsoon';
import { Link } from 'react-router-dom';
import VisaProcess from '@/components/VisaProcess';
import Blogs from '@/components/Blogs';

function Hero() {
  return (
    <>
      <div
        className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Navbar />

        <div className="flex flex-col items-center justify-center flex-grow text-center p-5 font-semibold z-10 mt-32 md:mt-40 lg:mt-64">
          <AnimatedShinyTextDemo />
          <h1 className="font-medium flex flex-wrap items-center justify-center text-3xl md:text-5xl lg:text-6xl leading-tight">
            Welcome to
            <span>
              <BlurIn
                className="text-blue-900 text-4xl md:text-5xl lg:text-6xl ml-2 font-serif"
                word="VisaVenture"
              />
            </span>
          </h1>

          <p className="text-black text-lg md:text-2xl lg:text-3xl mt-4">
            Simplify Your Visa Application Process
          </p>
          <p className="block text-sm md:text-lg lg:text-xl mt-2 text-blue-900">
            Find trusted visa agents tailored to your needs
          </p>

          <Contributors />

          <div className="flex gap-4 justify-center mt-6 md:mt-10">
            <Link to="/agent-signup">
              <Button>Become Agent</Button>
            </Link>
            <Link to="/signup">
              <Button>Become User</Button>
            </Link>
          </div>

          <VisaProcess />
          <Blogs />

          <div className="justify-center text-center mt-20 md:mt-40 w-full p-4 bg-transparent">
            <LetterPullup
              words={"Apply Visa With Confidence"}
              className="drop-shadow-lg text-lg md:text-xl font-medium"
              delay={0.15}
            />

            <div className="w-full">
              <p className="text-zinc-500 text-sm md:text-base">
                Our platform connects you with verified visa agents who understand the intricacies of the application process.
              </p>

              <Reviewers />
            </div>

            <h1 className="drop-shadow-lg text-center font-medium text-2xl md:text-3xl lg:text-4xl mt-16 md:mt-28">
              What Makes Us Different ?
            </h1>
            <p className="text-zinc-500 mt-2 mb-10 md:mb-14 text-sm md:text-base">
              Discover the benefits of our platform
            </p>

            <Features />
            <Collaborations />

            <div className="mx-auto z-10 bg-transparent">
              <Questions
                className="bg-transparent"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Hero;
