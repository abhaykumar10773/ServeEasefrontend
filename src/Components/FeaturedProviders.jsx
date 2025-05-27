// src/components/FeaturedProviders.js
//import React from "react";
import { motion } from 'framer-motion';
import professional from '../assets/images/professional.png';
import { Link } from 'react-router-dom';

function FeaturedProviders() {
  return (
    <div className="container-fluid bg-blue-100 d-flex flex-column flex-md-row align-items-center justify-content-space-around pt-5 mb-0">
    <div className="text-center">
      <img src={professional} alt="Service Worker" className="img-fluid" />
    </div>
    <div className=" text-md-left mb-4 mb-md-0 w-75 p-3 pl-8">
      <h1  className=" text-4xl font-bold text-blue-700">WE PROVIDE PROFESSIONAL HOME SERVICES.</h1>
      <p className="lead text-gray-600 mt-4"> randomised words which do not look even slightly believable. If you are going to
            use a passage of Lorem Ipsum, you need to be sure there is not anything
            embarrassing hidden in the middle of text. All randomised words which do not
            look even slightly</p>
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
           <Link to="/about">READ MORE</Link>
          </motion.button>
    </div>
    
  </div>
      
    
  );
}

export default FeaturedProviders;
