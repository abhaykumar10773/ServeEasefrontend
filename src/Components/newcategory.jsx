import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faTruck, faScrewdriver } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import "../styles/newcat.css" // for custom styles
import abstract from "../assets/uniqedesign/abstract.png";
import assemble from "../assets/images/assemble.jpg"
import plumbring from "../assets/images/plumbering.jpg"
import electricity from "../assets/images/electricity.jpg"
import clean from "../assets/images/clean.jpg"
import cooking from "../assets/images/cooking.jpg"

const services = {
  Assembly: {
    title: 'Assembly',
    description: [
      'Assemble or disassemble furniture items by unboxing, building, and any cleanup.',
     ],
    image: assemble, // Add appropriate image URL
  },
  Moving: {
    title: 'Moving',
    description: [
      'Moving help such as packing/unpacking, loading, and lifting heavy items.',
     ],
    image: plumbring, // Add appropriate image URL
  },
  Electricity: {
    title: 'Assembly',
    description: [
      'Assemble or disassemble furniture items by unboxing, building, and any cleanup.',
     ],
    image: electricity, // Add appropriate image URL
  },
  Plumbring: {
    title: 'Moving',
    description: [
      'Moving help such as packing/unpacking, loading, and lifting heavy items.',
     ],
    image: plumbring, // Add appropriate image URL
  },
  cleaning: {
    title: 'Assembly',
    description: [
      'Assemble or disassemble furniture items by unboxing, building, and any cleanup.',
     ],
    image: clean, // Add appropriate image URL
  },
  cooking: {
    title: 'Moving',
    description: [
      'Moving help such as packing/unpacking, loading, and lifting heavy items.',
     ],
    image: cooking, // Add appropriate image URL
  },
};



const HomeTaskComponent = () => {

  const [activeService, setActiveService] = useState('Assembly');

  const handleServiceChange = (service) => {
    setActiveService(service);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="container text-center py-5">

        <h1 className="display-4 fw-bold text-success">
          Book trusted Service providers <br></br> for home Services
        </h1>
        <div className="my-4">
          <input type="text" className="form-control form-control-lg d-inline-block w-75" placeholder="What do you need help with?" />
          <button className="btn btn-success btn-lg ml-2">Search</button>
        </div>
        {/* Icons Section */}
        <div className=" icons d-flex justify-content-center justify-evenly gap-4 mb-2 mt-10 ">
          <div className="text-center mx-6" onClick={() => handleServiceChange('Assembly')}>
          <FontAwesomeIcon icon={faWrench} className="mr-2 fa-2x" />
            <p>Assembly</p>
          </div>
          <div className="text-center mx-6" onClick={() => handleServiceChange('Moving')}>
          <FontAwesomeIcon icon={faTruck} className="mr-2 fa-2x" />
            <p>Mounting</p>
          </div>
          <div className="text-center mx-6" onClick={() => handleServiceChange('Plumbring')}>
          <FontAwesomeIcon icon={faScrewdriver} className="mr-2 fa-2x" />
            <p>Moving</p>
          </div>
          <div className="text-center mx-6" onClick={() => handleServiceChange('cleaning')}>
          <FontAwesomeIcon icon={faWrench} className="mr-2 fa-2x" />
            <p>Assembly</p>
          </div>
          <div className="text-center mx-6" onClick={() => handleServiceChange('cooking')}>
          <FontAwesomeIcon icon={faTruck} className="mr-2 fa-2x" />
            <p>Cook</p>
          </div>
          <div className="text-center mx-6" onClick={() => handleServiceChange('Electricity')}>
          <FontAwesomeIcon icon={faScrewdriver} className="mr-2 fa-2x" />
            <p>Moving</p>
          </div>
          {/* Add more icons as needed */}
        </div>
        <hr/>
      </div>

      {/* Task Categories */}
      <div className="container mb-1">
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-outline-success mx-2">General Furniture Assembly</button>
            <button className="btn btn-outline-success mx-2">IKEA Assembly</button>
            <button className="btn btn-outline-success mx-2">Crib Assembly</button>
            <button className="btn btn-outline-success mx-2">PAX Assembly</button>
            
          </div>
        </div>
      </div>

      {/* Service Content */}
      <div className=" container my-10 p-5 border rounded-lg bg-gray-50">
        <div className="flex items-start">
          {/* <div className="contentzindex conatiner ml--10 z-10 p-10 bg-slate-400 rounded-circle">
            <h2 className="text-2xl font-bold mb-3">
              {services[activeService].title}
            </h2>
            <ul className="list-disc ml-5 text-gray-700 ">
              {services[activeService].description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div> */}
          <div className='mx-2 '>
            <img
              src={services[activeService].image}
              alt={services[activeService].title}
              className="  rounded-lg"
              style={{
                width:'200vw' ,
                 height:"30vw"
              }}
            />
             {/* <div className="contentzindex conatiner ml--10 z-10 p-10 bg-slate-400 rounded-circle">
            <h2 className="text-2xl font-bold mb-3">
              {services[activeService].title}
            </h2>
            <ul className="list-disc ml-5 text-gray-700 ">
              {services[activeService].description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTaskComponent;
