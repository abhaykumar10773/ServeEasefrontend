// src/Footer.js
//import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footers() {
  return ( <>
       
    <footer className="text-center" style={{backgroundColor:"#5F6F65"}}>
      <div className="container p-4">
        <div className="row">
          {/* Logo and Newsletter Subscriptionto*/}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Teleport</h5>
            <p>
              Subscribe to our newsletter for the latest updates on new features and product releases.
            </p>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Enter your email"
              />
              <button className="btn btn-outline-danger" type="submit">
                Subscribe to our newsletter
              </button>
            </form>
            <small className="d-block mt-2">Stay connected with us for the latest updates and offers.</small>
          </div>

          {/* Company Linksto*/}
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Company</h5>
            <ul className="list-unstyled mb-0">
              <li><Link to="/home" className="text-dark">Home</Link></li>
              <li><Link to="/Service" className="text-dark">Services</Link></li>
              <li><Link to="/about" className="text-dark">About Us</Link></li>
              <li><Link to="/contact" className="text-dark">Contact Us</Link></li>
              <li><Link to="/" className="text-dark">FAQs</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li><Link to="#!" className="text-dark">Terms of Service</Link
              ></li>
              <li><Link to="#!" className="text-dark">Privacy Policy</Link
              ></li>
              <li><Link to="#!" className="text-dark">Cookies Policy</Link
              ></li>
              <li><Link to="#!" className="text-dark">Blog</Link
              ></li>
              <li><Link to="#!" className="text-dark">Careers</Link
              ></li>
            </ul>
          </div>


          {/* Social Media Links */}
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Connect with us</h5>
            <ul className="list-unstyled mb-0">
              <li><Link to="#!" className="text-dark"><FaFacebookF /> Facebook</Link ></li>
              <li><Link to="#!" className="text-dark"><FaInstagram /> Instagram</Link ></li>
              <li><Link to="#!" className="text-dark"><FaTwitter /> X</Link></li>
              <li><Link to="#!" className="text-dark"><FaLinkedinIn /> LinkedIn</Link></li>
              <li><Link to="#!" className="text-dark"><FaYoutube /> YouTube</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3 border-top">
        &copy; 2023 ServeEase. All rights reserved.
        <Link
         className="text-dark ms-2" href="#!">/privacy</Link >
        <Link
         className="text-dark ms-2" href="#!">/terms</Link>
        <Link
         className="text-dark ms-2" href="#!">/cookies</Link>
      </div>
    </footer>
    </>
  );
}

export default Footers;
