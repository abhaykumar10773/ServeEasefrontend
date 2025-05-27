import ss2image from "../assets/images/ss2image.png";
import "../styles/SServiceinfo.css";
import Cleankitchen from "../assets/images/Cleankitchen.jpeg";
import CustomSeparator from "../Components/bredcrumbsection";
import cleanBathroom from "../assets/images/cleanBathroom.jpg";
import clcleanlivingroom from "../assets/images/clcleanlivingroom.jpg";
import clbedroom from "../assets/images/clbedroom.jpeg";
import clwindow from "../assets/images/clwindow.jpeg";
import clcarpet from "../assets/images/clcarpet.jpeg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import  {selectSubcategory}  from "../features/booking/bookingSlice.js";

const Sserviceinfos = [
  {
    id: 1,
    title: "Kitchen Cleaning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi deleniti voluptatum dolor inventore ratione repudiandae illum provident recusandae, quo amet.",
    Image: Cleankitchen,
  },
  {
    id: 2,
    title: "Bathroom Cleaning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi deleniti voluptatum dolor inventore ratione repudiandae illum provident recusandae, quo amet.",
    Image: cleanBathroom,
  },
  {
    id: 3,
    title: "Living Room Cleaning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi deleniti voluptatum dolor inventore ratione repudiandae illum provident recusandae, quo amet.",
    Image: clcleanlivingroom,
  },
  {
    id: 4,
    title: "Bedroom Cleaning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi deleniti voluptatum dolor inventore ratione repudiandae illum provident recusandae, quo amet.",
    Image: clbedroom,
  },
  {
    id: 5,
    title: "Window Cleaning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi deleniti voluptatum dolor inventore ratione repudiandae illum provident recusandae, quo amet.",
    Image: clwindow,
  },
  {
    id: 6,
    title: "Carpet Cleaning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi deleniti voluptatum dolor inventore ratione repudiandae illum provident recusandae, quo amet.",
    Image: clcarpet,
  },
];

export default function ClServiceinfo() {
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
          {Sserviceinfos.map((service) => (
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
