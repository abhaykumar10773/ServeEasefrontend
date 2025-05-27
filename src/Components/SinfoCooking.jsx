import ss2image from "../assets/images/ss2image.png" // Cooking service banner
import "../styles/SServiceinfo.css";
import CustomSeparator from "../Components/bredcrumbsection"
import cooking from "../assets/images/cooking.jpg"; // Cooking service imageimport Scardinfo from "../Components/Scardinfo";
import coevent from "../assets/images/coevent.jpeg"
import codaily from "../assets/images/codaily.jpeg"
import comeal from "../assets/images/comeal.jpeg"
import coclasses from "../assets/images/coclasses.jpeg"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import  {selectSubcategory}  from "../features/booking/bookingSlice.js";




const Ckserviceinfos = [
  {
    id: 1,
    title: "Meal Preparation",
    description:
      "Delicious and healthy meals prepared by professional chefs at your convenience.",
    Image: cooking,
  },
  {
    id: 2,
    title: "Event Catering",
    description:
      "Tailored catering services for all types of events with personalized menus.",
    Image:coevent,
  },
  {
    id: 3,
    title: "Daily Home Cooking",
    description:
      "Affordable home-cooked meals prepared daily for families or individuals.",
    Image: codaily,
  },
  {
    id: 4,
    title: "Diet-Specific Meal Plans",
    description:
      "Specialized meals for diet-specific requirements like vegan, gluten-free, or keto.",
    Image: comeal,
  },
  {
    id: 5,
    title: "Cooking Classes",
    description:
      "Learn to cook like a pro with our hands-on cooking classes, available for all skill levels.",
    Image: coclasses,
  },
];

export default function CkServiceinfo() {
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
          {Ckserviceinfos.map((service) => (
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
