import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Top International Colleges on Our Platform",
    description:
      "Explore prestigious international colleges available for study visa applications through our platform. Simplify your admission process today!",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 2,
    title: "Our Global Collaborations",
    description:
      "We partner with renowned colleges and agents to bring the best opportunities to you. Check out our latest collaborations!",
    image:
      "https://img.freepik.com/premium-photo/global-collaboration-diverse-team-worldwide-impact_839035-712033.jpg",
  },
  {
    id: 3,
    title: "Success Stories of Our Students",
    description:
      "Read inspiring stories from students who secured their study visas and admissions through our platform. Be the next success story!",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 4,
    title: "Simplified Visa Application Process",
    description: "Make your visa application easy and efficient.",
 
    image:
      "https://simplevisa.com/wp-content/uploads/2024/03/1709146207.png",
  },
  {
    id: 5,
    title: "Why Choose Visa Venture?",
    description: "Learn about our unique features and benefits.",

    
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 6,
    title: "Real-Time Visa Tracking",
    description: "Stay updated with your application status.",
  
    image:
      "https://www.loginextsolutions.com/blog/wp-content/uploads/2021/05/image.png",
  },
];

const Blogs = () => {
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const navigate = useNavigate();

  // Show only the first 3 blogs, or show all if showAllBlogs is true
  const displayedBlogs = showAllBlogs ? blogs : blogs.slice(0, 3);

  return (
    <div className="bg-transparent mt-24 py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
      Dive Into Our Blog – Stories, Insights & More!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.4, duration: 2 }}
            className="bg-transparent shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">{blog.title}</h3>
              <p className="text-gray-600 text-sm">{blog.description}</p>
              <button
                onClick={() => navigate(`/blogs/${blog.id}`)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Read More
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Explore All Blogs Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => setShowAllBlogs(!showAllBlogs)} // Toggle between showing all or just 3 blogs
          className="px-8 py-3 bg-gradient-to-tr  from-zinc-900 to-slate-400 text-white rounded-full hover:bg-gray-400 transition-all duration-200"
        >
          {showAllBlogs ? "Show Less" : "Explore All Blogs"}
        </button>
      </div>
    </div>
  );
};

export default Blogs;
