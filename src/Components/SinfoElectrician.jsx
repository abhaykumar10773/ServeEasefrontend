import ss2image from "../assets/images/ss2image.png" // Electrical service banner
import "../styles/SServiceinfo.css";
import electricity from "../assets/images/electricity.jpg"; // Electrical service image
import { Link } from "react-router-dom";
import CustomSeparator from "./bredcrumbsection";
import ellight from "../assets/images/ellight.jpeg"
import elfuse from "../assets/images/elfuse.jpg"
import elelmergency from "../assets/images/elemergency.jpeg"
import { useDispatch } from "react-redux";
import  {selectSubcategory}  from "../features/booking/bookingSlice.js";

const Eserviceinfos = [
  {
    id: 1,
    title: "Wiring Installation",
    description:
      "Safe and efficient electrical wiring installation services for your home or business.",
    Image: electricity,
  },
  {
    id: 2,
    title: "Light Fixture Installation",
    description:
      "Professional installation of light fixtures and electrical outlets.",
    Image: ellight,
  },
  {
    id: 3,
    title: "Fuse Box Repair",
    description:
      "Expert repair and maintenance services for your fuse box and circuit breakers.",
    Image: elfuse,
  },
  {
    id: 4,
    title: "Emergency Electrical Services",
    description:
      "24/7 emergency electrical services to resolve critical issues immediately.",
    Image: elelmergency,
  },
];

export default function EServiceinfo() {
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
          {Eserviceinfos.map((service) => (
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
