import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ServiceLocation from './step1';
import ScheduleAndProvider from './step2';
import ReviewAndConfirm from './step3';
import { useNavigate } from 'react-router-dom';

const steps = ['Service Location', 'Select Schedule and Provider', 'Review and Confirm'];

export default function Booking() {
  const [activeStep, setActiveStep] = useState(0);
  const [locationData, setLocationData] = useState({});
  const [scheduleData, setScheduleData] = useState({});
  const [serviceProvider ,setserviceProvider] = useState('Laveda B.');
  
  const handleNext = (data) => {
    if (activeStep === 0) setLocationData(data);
    if (activeStep === 1) setScheduleData(data);
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

const navigate = useNavigate();
  const handleConfirm = () => {
    alert("Booking confirmed!");
    navigate('/user/bookings');
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', margin: 'auto', padding: 4 }}>
      <Stepper activeStep={activeStep} sx={{ marginBottom: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography variant="h6">All steps completed - booking confirmed!</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </>
      ) : (
        <>
          {activeStep === 0 && <ServiceLocation onNext={handleNext} />}
          {activeStep === 1 && <ScheduleAndProvider onNext={handleNext} onBack={handleBack} setProviderName={setserviceProvider} />}
          {activeStep === 2 && (
            <ReviewAndConfirm 
            onBack={handleBack} 
            onConfirm={handleConfirm} 
            locationData={locationData} 
            scheduleData={scheduleData}
            serviceProvider={serviceProvider} />

          )}
        </>
      )}
    </Box>
  );
}
