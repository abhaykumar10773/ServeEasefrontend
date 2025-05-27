import React from 'react'
import { Image } from 'react-bootstrap'
import cooking from '../assets/images/cooking.jpg'
export default function Sswhyuseservice() {
  return (
   <>
   <section id="why-choose-us" className="py-5 bg-light">
  <div className="container"><hr/>
    <div className="text-center mb-5">
      <h2 className="fw-bold fw-bold fs-1 text-success">Why Choose Our Services?</h2>
      <p className="text-muted fs-5">Discover the benefits that make us the perfect choice for your needs</p>
    </div>
    
    <div className="row text-center">
      
      <div className="col-md-4 mb-4">
        <div className="p-4 border rounded shadow-sm">
         <Image src={cooking} alt="Certified Experts" className="mb-3" width="60" height="60"/>
          <h4 className="fw-bold">Certified Experts</h4>
          <p className="text-muted">Our team is composed of trained professionals with certifications in their respective fields, ensuring top-quality service every time.</p>
        </div>
      </div>

      <div className="col-md-4 mb-4">
        <div className="p-4 border rounded shadow-sm">
          <Image src={cooking} alt="Guaranteed Satisfaction" className="mb-3" width="60" height="60"/>
          <h4 className="fw-bold">100% Satisfaction Guaranteed</h4>
          <p className="text-muted">We take pride in our work. If you are not completely satisfied, we will make it right – no questions asked.</p>
        </div>
      </div>

     
      <div className="col-md-4 mb-4">
        <div className="p-4 border rounded shadow-sm">
          <Image src={cooking} alt="Fast Service" classNameName="mb-3" width="60" height="60"/>
          <h4 className="fw-bold">Fast & Reliable Service</h4>
          <p className="text-muted">We prioritize punctuality and efficiency to make sure your service is completed on time and without hassle.</p>
        </div>
      </div>
    </div>
  </div>
</section>
</>
  )
}
