import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaSave } from "react-icons/fa"; // Add react-icons for icons

const AdditionalInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [workImages, setWorkImages] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setWorkImages((prevImages) => [...prevImages, ...newImages]);

    // Change the key to reset the file input
    setFileInputKey(Date.now());
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className=" mx-auto p-6">
      <motion.div
        className="relative mt-8 bg-white shadow-md rounded-lg p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Edit Button in Top Right */}
        <button
          onClick={toggleEdit}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
        >
          {isEditing ? <FaSave size={20} /> : <FaEdit size={20} />}
        </button>

        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>

        {/* Job Title and Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="jobTitle">
            Job Title
          </label>
          <select
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            disabled={!isEditing}
            className="form-control mb-3"
          >
            <option value="" disabled>Select a job title</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Cook">Cook</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="jobDescription">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Describe the work done, including details and completion date"
            className="form-control mb-3"
            rows="4"
            disabled={!isEditing}
          />
        </div>

        {/* Image Upload Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Upload Work Images</label>
          <input
            key={fileInputKey}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            id="fileInput"
            style={{ display: 'none' }}
            disabled={!isEditing}
          />
        </div>

        {/* Display Uploaded Images */}
        <div className="row">
          {workImages.map((image, index) => (
            <div key={index} className="col-2 mb-4">
              <img
                src={image}
                alt={`Work ${index + 1}`}
                className="img-thumbnail"
                style={{ width: '250px', height: '250px', objectFit: 'cover' }}
              />
            </div>
          ))}

          {/* Add additional "Add Image" box if more images are needed */}
          {isEditing && (
            <label
              htmlFor="fileInput"
              className="d-flex justify-content-center align-items-center border rounded border-secondary mb-3"
              style={{ width: '150px', height: '250px', cursor: 'pointer' }}
            >
              <div className="text-center">
                <span className="display-4 text-muted">+</span>
                <p className="text-muted">Add More Images</p>
              </div>
            </label>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdditionalInformation;
