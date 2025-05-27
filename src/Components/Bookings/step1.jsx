import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { searchProvider } from "../../features/booking/bookingAction";
import { Searchprovider } from "../../Api/bookingApi";
import { updateServiceLocation, updateServiceProvider } from "../../features/booking/bookingSlice";

const ServiceLocation = ({ onNext }) => {
  const dispatch = useDispatch();
  const categoryname = useSelector((state) => state.booking.selectedService);

  const [location, setLocation] = useState({
    houseNo: "",
    locationName: "",
    city: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);

    try{
      // Combine location data and category
      const requestData = {
        ...location,
        category: categoryname,
      };
      dispatch(updateServiceLocation(location));
     

       
    const response = await Searchprovider(requestData); // direct call by the form data 
   
    if (response && response.data.data) {
      //dispatch(updateServiceProvider(response.data));
      console.log("Providers found:", response.data );
    } else {
      console.log("No providers found");
    }

    onNext();
  } catch (error) {
    console.error("Error fetching service providers:", error);
    alert("An error occurred while searching for service providers.");
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="container bg-slate-300 mx-auto border-2 justify-center">
      <h3 className="mb-3 fw-bold fs-3 text-center">Enter Service Location</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleContinue();
        }}
      >
        <div className="mb-3">
          <label htmlFor="houseNo" className="form-label">
            House No
          </label>
          <input
            type="text"
            id="houseNo"
            className="form-control w-100"
            placeholder="Enter your Apartment/house no"
            required
            value={location.houseNo}
            onChange={(e) => setLocation({ ...location, houseNo: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="area" className="form-label">
            Street/Area
          </label>
          <input
            type="text"
            id="area"
            className="form-control w-100"
            placeholder="Enter your area name"
            required
            value={location.locationName}
            onChange={(e) => setLocation({ ...location, locationName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            id="city"
            className="form-control w-100"
            placeholder="Enter your city"
            required
            value={location.city}
            onChange={(e) => setLocation({ ...location, city: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Briefly describe your work
          </label>
          <textarea
            id="description"
            className="form-control w-100"
            placeholder="Define what work you need service for"
            value={location.description}
            onChange={(e) => setLocation({ ...location, description: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary my-2 text-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress color="primary" size={20} variant="indeterminate" />
          ) : (
            "Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default ServiceLocation;
