//import React from "react";
//import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import ServiceCard from "./Services/serviceCard";
import { Link } from 'react-router-dom';


const ServiceCategories = () => {
  return (
    <div className="container my-5" >
      <h2 className="text-center fs-1 fw-bold mb-4">OUR SERVICES</h2>
      <div className="row">
        <ServiceCard/>
       
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary"><Link to="/service" >VIEW MORE</Link></button>
      </div>
    </div>
  );
};

export default ServiceCategories;
