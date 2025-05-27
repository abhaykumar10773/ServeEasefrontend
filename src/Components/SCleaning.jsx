import ss2image from "../assets/images/ss2image.png"
import "../styles/SServiceinfo.css"
import cooking from "../assets/images/cooking.jpg"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function SServiceinfo() {
    console.log("succesfully service info page work show ")
  return (
    <>
    
    <div className="d-flex" style={{height: "20vw"}}>
       <img src={ss2image} alt="Service Worker" className="w-full shadow  bg-body" />
      </div>
    <h1 className="heading text-center fw-bold fs-1 text-success pt-4">   Hire a trusted service providers </h1>
    <div className="container hgf pt-4 d-flex">
        <div className="contentbox  m-3  ">
               <div className=" d-flex p-3 ">
                <div className="img rounded "> 
                <Image src={cooking} className=" roundeimg " alt="img" />
                </div>
                <div className="desc p-2 ">
                  <h1 className="dark fs-1">cleaning mt karow </h1>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, sint vero! Deleniti deserunt aspernatur voluptate neque labore voluptas nisi cumque, molestias</p>
                <Link to="/Booking" className="btn btn-outline-success mt-3"> Book now </Link></div>
               </div>
        </div>
        <div className="steps ">
                  <h1> all the steps are here </h1>
          </div>
    </div>
    
    </>
  )
}
