import { useState } from "react";
import NewLevel from "../NewLevel/NewLevel";
import NewSuscription from "../NewSuscription/NewSuscription";

const Wizard = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleComplete = () => {
    // Acción al completar todos los formularios
    console.log("Todos los formularios completados");
  };

  return (
    <div>
      {step === 1 && <NewLevel onNext={handleNext} />}
      {step === 2 && <NewSuscription onComplete={handleComplete} />}
    </div>
  );
};

export default Wizard;
