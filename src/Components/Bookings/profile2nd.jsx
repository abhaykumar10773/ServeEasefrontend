
import { useState } from "react";

export default function Profile2nd({ onNext }) {

    const [serviceProvider] = useState(''); // assuming service provider is fixed in this step

  const handleContinue = () => {
    const selectedData = {
     
      serviceProvider,
    };
    onNext(selectedData);
  };
  return (
    <>
    <div className="bg-white border-2 p-4 mb-4 rounded shadow-md w-full">
          <div className="flex gap-4">
            <img src="https://via.placeholder.com/80" alt="Profile" className="w-20 h-20 rounded-full" />
            <div className="flex flex-col">
              <h3 className="font-bold text-xl">Laveda B.</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">GREAT VALUE</span>
              <p className="text-sm text-gray-500">4.8 (638 reviews) | 1214 Cleaning tasks</p>
              <p className="text-sm text-gray-500">Vehicle: Car</p>
            </div>
            <div className="ml-auto text-lg font-semibold">$56.78/hr</div>
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
              I have 10 years experience in cleaning offices, air bnbs, houses, townhomes, apartments...
              <span className="font-semibold text-green-600">Read More</span>
            </p>
          </div>

          {/* Review Section */}
          <div>
            <p className="font-semibold">Monica P. on Sat, Nov 2</p>
            <p className="text-gray-600 text-sm">Laveda did a great and efficient job </p>
          </div>
        </div>
    </>
  )
}
