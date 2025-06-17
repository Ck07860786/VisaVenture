import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundImage from '../assets/Images/Herobgi.png';
import Navbar from "@/components/ui/shared/Navbar";

const blogs = [
  {
    id: 1,
    title: "Top International Colleges on Our Platform",
    subtitle: "Discover the best colleges tailored for you.",
    content: `Our platform connects students with some of the top international colleges. 
    From globally recognized universities to specialized institutions, 
    we simplify the admission process for every aspiring student. 
    Experience a seamless journey as you explore opportunities and take a step 
    towards achieving your academic dreams.`,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 2,
    title: "Our Global Collaborations",
    subtitle: "Bringing the best opportunities to you.",
    content: `We take pride in collaborating with renowned institutions and agencies across the globe. 
    These partnerships enable us to provide unmatched services to students. 
    Learn about our ongoing collaborations and how we are shaping the future 
    of education and visa services.`,
    image: "https://img.freepik.com/premium-photo/global-collaboration-diverse-team-worldwide-impact_839035-712033.jpg",
  },
  {
    id: 3,
    title: "Success Stories of Our Students",
    subtitle:"Real stories of students who achieved their dreams with VisaVenture",
    content:
      "Read inspiring stories from students who secured their study visas and admissions through our platform. These success stories highlight the dedication, hard work, and perseverance of students who trusted our platform to guide them through the complex visa application process. From securing admissions to top universities to successfully obtaining visas, these real-life experiences showcase how our platform has empowered students to turn their academic dreams into reality. Be inspired by their journeys and take the first step towards your own success story!",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 4,
    title: "Simplified Visa Application Process",
    subtitle: "Make your visa application easy and efficient.",
    content: 
      "Our platform ensures a simplified and user-friendly visa application process.We guide you at every step, from document submission to real-time tracking, making it a stress-free experience."
    ,
    image:
      "https://simplevisa.com/wp-content/uploads/2024/03/1709146207.png",
  },
  {
    id: 5,
    title: "Why Choose Visa Venture?",
    subtitle: "Learn about our unique features and benefits.",
    content: 
      "Visa Venture is your one-stop solution for hassle-free visa services. Our platform offers AI-based agent recommendations, secure document handling, and a wide network of top agents and institutions."
    ,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 6,
    title: "Real-Time Visa Tracking",
    subtitle: "Stay updated with your application status.",
    content: 
      "Track your visa application in real-time with our platform. Transparency and efficiency are our core values, ensuring you have full visibility of the process from start to finish."
    ,
    image:
      "https://www.loginextsolutions.com/blog/wp-content/uploads/2021/05/image.png",
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedBlog = blogs.find((blog) => blog.id === parseInt(id));

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <div className="py-16 mt-20 px-6 md:px-10 lg:px-20">
        {/* Detailed Blog Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto bg-transparent shadow-2xl rounded-xl overflow-hidden mb-12 flex flex-col lg:flex-row"
        >
          {/* Left Section (Image) */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-full object-cover rounded-t-xl lg:rounded-l-xl transform scale-110"
            />
          </motion.div>

          {/* Right Section (Content) */}
          <div className="w-full lg:ml-20 lg:w-1/2 p-8 bg-transparent">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">{selectedBlog.title}</h1>
            <h2 className="text-lg sm:text-xl text-gray-600 mb-6 italic">{selectedBlog.subtitle}</h2>
            <motion.p
              className="text-gray-700 text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              {selectedBlog.content}
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.8 }}
            >
              <button
                onClick={() => navigate("/blogs")}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200"
              >
                Explore All Blogs
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Other Blogs Section */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Explore More Blogs
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs
            .filter((blog) => blog.id !== parseInt(id)) // Exclude the currently displayed blog
            .map((blog) => (
              <motion.div
                key={blog.id}
                className="bg-transparent shadow-xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
                <div className="p-6 bg-transparent rounded-b-lg">
                  <h3 className="text-lg sm:text-2xl font-semibold text-gray-800">{blog.title}</h3>
                  <p className="text-gray-600 mt-2 line-clamp-3">{blog.subtitle}</p>
                  <motion.button
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Read More
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
