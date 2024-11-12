import React from 'react';
import { motion } from 'framer-motion';

export const FadeText = ({ className, direction, framerProps, text }) => {
  // Define animations based on direction
  const variants = {
    up: { opacity: [0, 1, 0], y: [20, 0, 20] },
    right: { opacity: [0, 1, 0], x: [20, 0, -20] },
    down: { opacity: [0, 1, 0], y: [-20, 0, 20] },
    left: { opacity: [0, 1, 0], x: [-20, 0, 20] },
  };

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={variants[direction]}
      transition={{ repeat: Infinity, repeatType: "loop", duration: 2, ...framerProps }}
    >
      {text}
    </motion.div>
  );
};

export default FadeText;
