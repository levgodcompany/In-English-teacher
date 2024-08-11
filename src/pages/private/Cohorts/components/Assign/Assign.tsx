// import styles from "./Assign.module.css";
import Student from "./components/Student/Student";
import Teacher from "./components/Teacher/Teacher";
import Unit from "./components/Unit/Unit";

interface AssignPorps {
  idCohort: number;
}
const Assign: React.FC<AssignPorps> = ({ idCohort }) => {
  return (
    <div>
      <div>
        <p>Asignar Profesor</p>
        <div>
          <Teacher idCohort={idCohort} />
        </div>
      </div>
      <div>
        <p>Asignar Estudiante</p>
        <div>
          <Student idCohort={idCohort} />
        </div>
      </div>
      <div>
        <p>Asignar Unidad</p>
        <div>
          <Unit idCohort={idCohort} />
        </div>
      </div>
    </div>
  );
};

export default Assign;
