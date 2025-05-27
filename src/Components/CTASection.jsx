// src/components/CTASection.js
//import React from "react";
import { Container, Button } from 'react-bootstrap';

function CTASection() {
  return (
    <div className="cta-section bg-primary text-white text-center py-5">
      <Container>
        <h2>Ready to Book a Service?</h2>
        <p>Get 10% off your first booking</p>
        <Button variant="light" size="lg" href="#">
          Book Now
        </Button>
      </Container>
    </div>
  );
}

export default CTASection;
