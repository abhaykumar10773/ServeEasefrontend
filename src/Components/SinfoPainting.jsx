import ss2image from "../assets/images/ss2image.png"  // Painting service banner
import "../styles/SServiceinfo.css";
import Plumbering from "../assets/images/plumbering.jpg";
import { Link } from "react-router-dom";
import CustomSeparator from "./bredcrumbsection";
import { useDispatch } from "react-redux";
import  {selectSubcategory}  from "../features/booking/bookingSlice.js";

const PaintServiceinfos = [
  {
    id: 1,
    title: "Interior Painting",
    description:
      "Refresh your home’s interior with a professional painting service.",
    Image: Plumbering,
  },
  {
    id: 2,
    title: "Exterior Painting",
    description:
      "High-quality exterior painting to protect and enhance your property.",
    Image: Plumbering,
  },
  {
    id: 3,
    title: "Wall Texturing",
    description:
      "Expert wall texturing services to add dimension and style to your walls.",
    Image: Plumbering,
  },
  {
    id: 4,
    title: "Fence Painting",
    description:
      "Durable and long-lasting fence painting services for a fresh look.",
    Image: Plumbering,
  },
];

export default function PaintServiceinfo() {
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
        {PaintServiceinfos.map((service) => (
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
