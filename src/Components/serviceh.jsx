// it is useless previous design

import { useState } from 'react';

const services = {
  Assembly: {
    title: 'Assembly',
    description: [
      'Assemble or disassemble furniture items by unboxing, building, and any cleanup.',
      'Now Trending: Curved sofas, computer desks, and sustainable materials.',
    ],
    image: 'assembly_image_url', // Add appropriate image URL
  },
  Moving: {
    title: 'Moving',
    description: [
      'Moving help such as packing/unpacking, loading, and lifting heavy items.',
      'Now Trending: Single-item moves, apartment moves, and junk removal.',
    ],
    image: 'moving_image_url', // Add appropriate image URL
  },
  // Add more services as needed...
};

const ServiceComponent = () => {
  const [activeService, setActiveService] = useState('Assembly');

  const handleServiceChange = (service) => {
    setActiveService(service);
  };

  return (
    <div className="container mx-auto p-5">
      {/* Service Selector */}
      <div className="flex justify-around">
        {Object.keys(services).map((service) => (
          <button
            key={service}
            onClick={() => handleServiceChange(service)}
            className={`px-4 py-2 border ${
              activeService === service
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500'
            } rounded-lg`}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Service Content */}
      <div className="mt-10 p-5 border rounded-lg bg-gray-50">
        <div className="flex items-start">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-3">
              {services[activeService].title}
            </h2>
            <ul className="list-disc ml-5 text-gray-700">
              {services[activeService].description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 pl-5">
            <img
              src={services[activeService].image}
              alt={services[activeService].title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceComponent;
