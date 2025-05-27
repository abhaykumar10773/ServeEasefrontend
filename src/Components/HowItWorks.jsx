// src/components/HowItWorks.js
//import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const steps = [
  { step: "1", title: "Choose a Service", icon: "🛠️" },
  { step: "2", title: "Select Date & Time", icon: "📅" },
  { step: "3", title: "Confirm Booking", icon: "✅" },
  { step: "4", title: "Relax", icon: "😌" },
];

function HowItWorks() {
  return (
    <Container className="my-5 text-center">
      <h2>How It Works</h2>
      <Row>
        {steps.map((step, index) => (
          <Col md={3} key={index}>
            <div className="how-it-works-step">
              <h3>{step.icon}</h3>
              <h4>Step {step.step}</h4>
              <p>{step.title}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HowItWorks;
