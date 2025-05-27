import ss2image from "../assets/images/ss2image.png"  // Update with a plumbing-related banner image
import "../styles/SServiceinfo.css";
import Plumbering from "../assets/images/plumbering.jpg"; // New plumbing service image
import { Link } from "react-router-dom";
import CustomSeparator from "./bredcrumbsection";
import plleak from "../assets/images/plleak.jpeg"
import pldrain from "../assets/images/pldrain.jpeg"
import plheat from "../assets/images/plheat.jpeg"
import plemegency from "../assets/images/plemegency.jpeg"
import { useDispatch } from "react-redux";
import  {selectSubcategory}  from "../features/booking/bookingSlice.js";

const Pserviceinfos = [
  {
    id: 1,
    title: "Pipe Installation",
    description:
      "Expert pipe installations using high-quality materials for lasting results.",
    Image: Plumbering,
  },
  {
    id: 2,
    title: "Leak Repair",
    description:
      "Fast and reliable leak repairs to protect your home from water damage.",
    Image: plleak,
  },
  {
    id: 3,
    title: "Drain Cleaning",
    description:
      "Thorough drain cleaning services to clear blockages and prevent backups.",
    Image: pldrain,
  },
  {
    id: 4,
    title: "Water Heater Repair",
    description:
      "Professional water heater repairs and installations for consistent hot water.",
    Image: plheat,
  },
  {
    id: 5,
    title: "Emergency Plumbing",
    description:
      "24/7 emergency plumbing services to tackle urgent repairs and issues.",
    Image: plemegency,
  },
];

export default function PServiceinfo() {
  const dispatch = useDispatch();

  const handleBookNow = (serviceTitle) => {
    dispatch(selectSubcategory(serviceTitle));
    console.log("Cleaning subtitle ",serviceTitle);
  };

  return (
    <>
      <div className="d-flex" style={{ height: "20vw" }}>
        <img
          src={ss2image}
          alt="Service Worker"
          className="w-full shadow bg-body"
        />
      </div>
      <h1 className="heading text-center fw-bold fs-1 text-success pt-4">
        Hire a trusted service provider
      </h1>

      <div className="hgf container d-flex">
        <div className="w-full m-3">
          <div className="ml-4">
            <CustomSeparator />
          </div>
          {Pserviceinfos.map((service) => (
            <div key={service.id} className="contentbox m-3">
              <div className="d-flex main p-3">
                <div className="img rounded center">
                  <img
                    src={service.Image}
                    className="roundeimg"
                    alt={service.title}
                  />
                </div>
                <div className="desc p-2">
                  <h1 className="dark fs-4">{service.title}</h1>
                  <p>{service.description}</p>
                  <Link to="/Booking" className="btn btn-outline-success mt-3" onClick={() => handleBookNow(service.title)}>
                    Book now
                  </Link>
                </div>
              </div>
              {/* Additional Content for Each Service */}
              {/* <div className="additional-content p-3">
                <h4 className="text-secondary">
                  Why choose us for {service.title}?
                </h4>
                <p>
                  Our {service.title.toLowerCase()} ensures a clean and
                  healthy environment with professional service and attention to
                  detail.
                </p>
              </div> */}
              <hr />
            </div>
          ))}
        </div>
        <div className="steps pt-4">
          <h1>All the steps are here</h1>
        </div>
      </div>
    </>
  );
}
