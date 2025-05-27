 // it is not use anywhere ok 




 
import { Link } from "react-router-dom"
import cooking from "../assets/images/cooking.jpg"


export default function Scardinfo({servicesinfo}) {
    console.log("service card work properly")
  return (
    <>
   <div className="contentbox m-3">
        <div className="d-flex main p-3">
          <div className="img rounded center">
            <img src={servicesinfo.Image} className="roundeimg" alt="Service" />
          </div>
          <div className="desc p-2">
            <h1 className="dark fs-4">{servicesinfo.title}</h1>
            <p>{servicesinfo.description}</p>
            <Link to="/Booking" className="btn btn-outline-success mt-3"> 
              Book now 
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
