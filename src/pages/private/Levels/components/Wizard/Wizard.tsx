import { useState } from "react";
import NewLevel from "../NewLevel/NewLevel";
import NewSuscription from "../NewSuscription/NewSuscription";
import style from "./Wizard.module.css"
interface WizardProps {
  close: ()=> void
}
const Wizard: React.FC<WizardProps> = ({
  close
}) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleComplete = () => {
    // Acción al completar todos los formularios
    close
  };

  return (
    <div className={style.container} >
      {step === 1 && <NewLevel onNext={handleNext} />}
      {step === 2 && <NewSuscription onComplete={handleComplete} />}
    </div>
  );
};

export default Wizard;
