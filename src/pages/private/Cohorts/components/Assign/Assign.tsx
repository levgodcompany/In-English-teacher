import styles from "./Assign.module.css";
import Student from "./components/Student/Student";
import Teacher from "./components/Teacher/Teacher";
import Unit from "./components/Unit/Unit";

interface AssignProps {
  idCohort: number;
  close: ()=> void
}

const Assign: React.FC<AssignProps> = ({ idCohort, close }) => {
  return (
    <div className={styles.container}>
      <div>
        <button onClick={close}>Cerrar</button>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Asignar Profesor</p>
        <div className={styles.content}>
          <Teacher idCohort={idCohort} />
        </div>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Asignar Estudiante</p>
        <div className={styles.content}>
          <Student idCohort={idCohort} />
        </div>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Asignar Unidad</p>
        <div className={styles.content}>
          <Unit idCohort={idCohort} />
        </div>
      </div>
    </div>
  );
};

export default Assign;
