import ss2image from "../assets/images/ss2image.png";
import clean from "../assets/images/clean.jpg";
import electricity from "../assets/images/electricity.jpg";
import cooking from "../assets/images/cooking.jpg";
import carpanter from "../assets/images/carpanter.jpg";
import assemble from "../assets/images/assemble.jpg";
import plumbering from "../assets/images/plumbering.jpg";
import Sswhyuseservice from "../Components/Sswhyuseservice.jsx";
import { useLocation, Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import  {updateSelectedService}  from "../features/booking/bookingSlice.js";

const services = [
  {
    id: 1,
    title: "Cleaning",
    description: "Cleanliness goes beyond appearances – it’s about maintaining hygiene, reducing allergens, and creating a calming space.",
    image: clean,
    path: "cleaning",
  },
  {
    id: 2,
    title: "Cooking",
    description: "Busy day? Leave it to our expert chefs who will prepare healthy, delicious meals right in your kitchen.",
    image: cooking,
    path: "cooking",
  },
  {
    id: 3,
    title: "Plumbing",
    description: "Leaky faucets or clogged drains? A small problem today could turn into a major issue tomorrow.",
    image: cooking,
    path: "plumbing",
  },
  {
    id: 4,
    title: "Electrician",
    description: "Safety comes first! From installing new fixtures to repairing faulty wiring, certified electricians ensure your home is safe.",
    image: electricity,
    path: "electrician",
  },
  {
    id: 5,
    title: "Carpenter",
    description: "Get high-quality custom furniture and fixture repairs tailored to your needs. Our skilled carpenters deliver durable craftsmanship.",
    image: carpanter,
    path: "carpenter",
  },
  {
    id: 6,
    title: "Assembly",
    description: "Let our experts handle your furniture or equipment assembly quickly and efficiently. We ensure accurate setups, saving you time.",
    image: assemble,
    path: "assembly",
  },
];

export default function Service() {
  const location = useLocation();
  const isServicedetails = location.pathname === "/Service";

  const dispatch = useDispatch();

  const handleBookNow = (serviceTitle) => {
    dispatch(updateSelectedService(serviceTitle));
    console.log("our title ",serviceTitle);
  };
  
  return (
    <>
      {isServicedetails && (
        <>
          <div className="d-flex" style={{ height: "20vw" }}>
            <img src={ss2image} alt="Service Worker" className="w-full shadow bg-body" />
          </div>

          <div className="container">
            <div className="text-center fw-bold fs-1 text-success pt-4">
              <h1>Our Services</h1>
            </div>
          <div className="container my-4">
  <div className="row justify-content-center">
    {services.map((service) => (
      <div
        key={service.id}
        className="col-12 col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center"
      >
        <div
          className="card text-center m-3 rounded shadow-sm"
          style={{ width: "100%", maxWidth: "22rem" }}
        >
          <img
            src={service.image}
            className="card-img-top"
            alt={service.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h1 className="card-title fs-4 fw-bold">{service.title} Service</h1>
            <p className="card-text">{service.description}</p>
            <Link
              to={`/Service/${service.path}`}
              className="btn btn-outline-success mt-3"
              onClick={() => handleBookNow(service.title)}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


          </div>

          <Sswhyuseservice />
        </>
      )}

      <Outlet />
    </>
  );
}


