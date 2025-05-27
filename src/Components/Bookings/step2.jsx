import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProvider,updateSchedule } from "../../features/booking/bookingSlice.js";
//import { searchProvider } from "../../features/booking/bookingAction.js";

const ScheduleAndProvider = ({ onNext }) => {
  const [date, setDate] = useState('');
  const [shift, setShift] = useState('');
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      // LocalStorage se data fetch karna
      const storedData = localStorage.getItem("Providers");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setServiceProviders(parsedData.data || []); // Ensure data is an array
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to load data");
      setLoading(false);
    }
  }, []);

  const handleSelectProvider = (provider) => {
    dispatch(setSelectedProvider(provider));
  };

  const handleContinue = () => {
    dispatch(updateSchedule({ date, shift }));
    onNext();
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={(e) => { 
        e.preventDefault(); 
        handleContinue(); 
      }}>
        <div className="flex justify-end mb-4">
          <div>
            <label className="font-semibold mr-2">Sorted by:</label>
            <select className="border border-gray-300 rounded p-2">
              <option>Recommended</option>
              <option>Price (low to high)</option>
              <option>Price (high to low)</option>
              <option>Experienced</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary mx-2 text-center">
            Continue
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
  {/* Date & Shift Options - 33% width in large screens */}
  <div className="bg-white p-4 border-2 rounded shadow-md flex-shrink-0 w-full lg:w-1/3 h-[400px] overflow-auto">
  <label htmlFor="date" className="form-label font-bold">Select the date</label>
<input
  type="date"
  id="date"
  className="form-control w-full mb-4"
  required
  min={new Date().toISOString().split("T")[0]} // Today's date
  max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]} // 7 days ahead
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>


    <h3 className="font-bold mb-4">Time of Day</h3>
    {["Morning (8am - 12pm)", "Afternoon (12pm - 4pm)", "Evening (4pm - 8pm)"].map((time, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <input type="radio" id={time} name="shift" onChange={() => setShift(time.split(" ")[0])} />
        <label htmlFor={time} className="text-gray-700">{time}</label>
      </div>
    ))}
  </div>

  {/* Profile Section - 67% width in large screens */}
  <div className="w-full lg:w-2/3">
    {loading ? <p>Loading providers...</p> : error ? <p>Error: {error}</p> : (
      serviceProviders.map((provider) => (
        <div key={provider._id} onClick={() => handleSelectProvider(provider)} className="bg-white border-2 p-4 mb-4 rounded shadow-md cursor-pointer">
          <div className="flex gap-4">
            <img src={provider.image || "https://via.placeholder.com/80"}alt="Profile" className="w-20 h-20 rounded-full" />
            <div className="flex flex-col">
              <h3 className="font-bold text-xl">{provider.provider.FullName}</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">{provider.category}</span>
              <p className="text-sm text-gray-500">4.8 (638 reviews) |{provider.category}</p>
              <p className="text-sm text-gray-500">Vehicle: Car</p>
            </div>
            <div className="ml-auto text-lg font-semibold">{provider.provider.email} | ₹{provider.price}</div>
          </div>

          <div className="my-4">
            <button onClick={handleContinue}  className="btn btn-success w-full">Select & Continue</button>
            <p className="text-center text-gray-500 text-sm mt-2">
              You can chat with your Tasker, adjust task details, or change task time after booking.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h4 className="font-bold">How I can help:</h4>
            <p className="text-sm text-gray-600">
            {provider.description} <span className="font-semibold text-green-600">Read More</span>
            </p>
          </div>

          {/* Review Section */}
          <div>
            <p className="font-semibold">Monica P. on Sat, Nov 2</p>
            <p className="text-gray-600 text-sm">Laveda did a great and efficient job </p>
          </div>
        </div>
      ))
    )}
  </div>
</div>

      </form>
    </div>
  );
};

export default ScheduleAndProvider;

