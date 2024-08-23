import { useEffect, useState } from "react";
import { CohortAllInfo } from "../../../types/Cohorts.types";
import CohortService from "../../services/Cohort.service";
import styles from "./Cohort.module.css";

interface CohortProps {
  idCohort: number;
}

const CohortInfo: React.FC<CohortProps> = ({ idCohort }) => {
  const [cohort, setCohort] = useState<CohortAllInfo | null>(null);

  useEffect(() => {
    fetchCohort();
  }, []);

  const fetchCohort = async () => {
    try {
      const service = CohortService.crud();
      service.setUrl(`/all-info`);
      const res = await service.findOne<CohortAllInfo, string>(`/${idCohort}`);
      setCohort(res);
    } catch (error) {
      console.error("Error fetching cohort:", error);
    }
  };

  if (!cohort) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.cohortContainer}>
      <h1 className={styles.title}>{cohort.title}</h1>
      <p className={styles.description}>{cohort.description}</p>
      <p>
        <strong>Fecha Inicio:</strong>{" "}
        {new Date(cohort.startDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Fecha Fin:</strong>{" "}
        {new Date(cohort.endDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Inicio de Inscripción:</strong>{" "}
        {new Date(cohort.registrationStartDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Fin de la inscripción:</strong>{" "}
        {new Date(cohort.registrationEndDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Nivel:</strong> {cohort.level.title} -{" "}
        {cohort.level.description}
      </p>

      <h2>Unidades</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Orden</th>
          </tr>
        </thead>
        <tbody>
          {cohort.cohortUnities.map((unit) => (
            <tr key={unit.idUnit}>
              <td>{unit.unities.title}</td>
              <td>{unit.unities.description}</td>
              <td>{unit.unities.order}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Cursos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Unit ID</th>
          </tr>
        </thead>
        <tbody>
          {cohort.cohortCourses.map((course) => (
            <tr key={course.idCourse}>
              <td>{course.courses.title}</td>
              <td>{course.courses.idUnit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Módulos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Orden</th>
          </tr>
        </thead>
        <tbody>
          {cohort.cohortModules.map((module) => (
            <tr key={module.idModule}>
              <td>{module.modules.title}</td>
              <td>{module.modules.description}</td>
              <td>{module.modules.order}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Estudiantes</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {cohort.cohortStudents.map((student) => (
            <tr key={student.idStudent}>
              <td>{student.student.name}</td>
              <td>{student.student.lastName}</td>
              <td>{student.student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Profesores</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {cohort.cohortTeachers.map((teacher) => (
            <tr key={teacher.idTeacher}>
              <td>{teacher.teacher.name}</td>
              <td>{teacher.teacher.lastName}</td>
              <td>{teacher.teacher.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CohortInfo;
