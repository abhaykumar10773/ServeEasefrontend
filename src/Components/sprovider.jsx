import React, { useState } from "react";
import { TextField, MenuItem, Button, Input } from "@mui/material"; 
import professional from "../assets/images/professional.png";
import { Link } from "react-router-dom";
import { registerserviceApi } from "../Api/providerApi";


// Available options

const categories = ["Cleaning", "Cooking", "Plumber","Electrician","Carpenter","Plumber"];
const hourlyRates = [100, 200, 300, 400];
const radiusOptions = [3, 4, 5]; // Radius between 3km and 5km

const Sprovider = () => {
  const [selectedArea, setSelectedArea] = useState("Albany");
  const [selectedCategory, setSelectedCategory] = useState("Help Moving");
  const [selectedHourlyRate, setSelectedHourlyRate] = useState(100);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(3);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedHourlyRate < 100) {
      setError("Hourly rate must be at least $100.");
      return;
    }
    setError("");
    const servicedata = {
      category: selectedCategory,
      price: selectedHourlyRate,
      description,
      address,
      radius,
    }

    try {
      const response = await registerserviceApi(servicedata);
      alert("Service registered successfully!");
      console.log(response.data);
    } catch (err) {
      console.error("Error registering service", err);
      alert("Failed to register service. Please try again.");
    }
  };

  return (
    <div className="container-fluid d-flex flex-wrap justify-content-evenly align-items-center mt-3 p-4">
      {/* Image Section */}
      <div className="col-md-6 d-none d-md-block">
        <img src={professional} alt="Worker" className="img-fluid rounded" />
      </div>

      {/* Form Section */}
      <div className="col-md-5 p-5 bg-white rounded shadow">
        <h2 className="font-bold text-2xl text-gray-900 mb-4">Earn money your way</h2>
        <p className="text-gray-700 mb-3">See how much you can make tasking on TaskRabbit</p>
        
        <form onSubmit={handleSubmit}>
          {/* Area Selection */}
          <TextField
  label="Enter your location"
  onChange={(e) => setSelectedArea(e.target.value)}
  fullWidth
  margin="normal"
  variant="outlined"
>
          </TextField>


          {/* Category Selection */}
          <TextField
            select
            label="Choose a Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          {/* Hourly Rate Selection */}
          <TextField
            select
            label="Select your hourly rate"
            value={selectedHourlyRate}
            onChange={(e) => setSelectedHourlyRate(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            error={selectedHourlyRate < 100}
            helperText={selectedHourlyRate < 100 ? "Minimum hourly rate is $100" : ""}
          >
            {hourlyRates.map((rate) => (
              <MenuItem key={rate} value={rate}>
                {rate}
              </MenuItem>
            ))}
          </TextField>

          {/* Description Input */}
          <TextField
            label="Service Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
            required
          />

          {/* Address Input */}
          {/* <TextField
            label="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          /> */}

          {/* Radius Selection */}
          <TextField
            select
            label="Select your service radius (in km)"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {radiusOptions.map((r) => (
              <MenuItem key={r} value={r}>
                {r} km
              </MenuItem>
            ))}
          </TextField>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="success" fullWidth size="large" className="mt-4">
            Get Started
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-3 text-center">
          <p className="text-gray-600">
            Already have an account? <Link to='/userlogin' className="text-green-600">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sprovider;
