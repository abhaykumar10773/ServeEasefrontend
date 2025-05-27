import ss2image from "../assets/images/ss2image.png" 
import "../styles/SServiceinfo.css";
import carpanter from "../assets/images/carpanter.jpg"; // Carpentry service image
import { Link } from "react-router-dom";
import CustomSeparator from "../Components/bredcrumbsection";
import cacabinet from "../assets/images/cacabinet.jpeg"
import cadoor from "../assets/images/cadoor.jpeg"
import cawooden from "../assets/images/cawooden.jpeg"
import { useDispatch } from "react-redux";
import  {selectSubcategory}  from "../features/booking/bookingSlice.js";

const Cserviceinfos = [
  {
    id: 1,
    title: "Furniture Repair",
    description:
      "Skilled carpenters for repairing and restoring your furniture.",
    Image: carpanter,
  },
  {
    id: 2,
    title: "Cabinet Installation",
    description:
      "Custom cabinet installations to match your home’s interior.",
    Image: cacabinet,
  },
  {
    id: 3,
    title: "Door and Window Frames",
    description:
      "Expertly crafted and installed door and window frames for your property.",
    Image: cadoor,
  },
  {
    id: 4,
    title: "Wooden Flooring Installation",
    description:
      "Durable and attractive wooden flooring installation for homes and offices.",
    Image: cawooden,
  },
];

export default function CServiceinfo() {
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
        {Cserviceinfos.map((service) => (
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
