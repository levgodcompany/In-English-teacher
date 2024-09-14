import { useState } from "react";
import styles from "./Module.module.css";
import CohortService from "../../../../services/Cohort.service";
import { ModuleInfoBasic } from "../../../../../types/Modules.types";
import ModulesService from "../../../../../Modules/services/Modules.service";
import { CohortModuleRelationshipDTO } from "../../types/Assign.type";

interface ModuleProps {
  idCohort: number;
  idCourse: number;
  modulesAssig: CohortModuleRelationshipDTO[] | undefined;
}

const Module: React.FC<ModuleProps> = ({
  idCohort,
  idCourse,
  modulesAssig,
}) => {
  const [modules, setModules] = useState<ModuleInfoBasic[]>([]);
  const [formData, setFormData] = useState<number>(0);

  const [isLoad, setIsLoad] = useState<boolean>(false);
  const assigCourses = () => {
    fetchModules();
  };

  const fetchModules = async () => {
    try {
      const service = ModulesService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<ModuleInfoBasic[]>();
      const f = result.filter((c) => c.idCourse == idCourse);
      setIsLoad(true);
      setModules(f);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(Number(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CohortService.httpAssignUpdate(`${idCohort}/module/${formData}`);
    } catch (error) {
      console.error("Error assigning module:", error);
      alert("Failed to assign module. Please try again.");
    }
  };

  return (
    <div className={styles.container_course}>
      {isLoad ? (
        <form onSubmit={handleSubmit} className={styles.cohortForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Curso:</label>
            <select
              id="idCourse"
              name="idCourse"
              value={formData}
              className={styles.selectInput}
              onChange={handleChange}
              required
            >
              <option value={0}>Seleccionar Curso</option>
              {modules.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit">Asignar esta cohorte a este Curso</button>
          </div>
        </form>
      ) : (
        <button onClick={assigCourses}>Assignar Cursos</button>
      )}

      {/* Mostrar los cursos ya asignados */}
      <div className={styles.assignedCoursesContainer}>
        {modulesAssig && modulesAssig.length > 0 ? (
          modulesAssig.map((course) => (
            <div key={course.idCourse} className={styles.courseCard}>
              <h3>{course.title}</h3>
              <p>{course.title}</p>
              <span>{course.enabled ? "Activo" : "Inactivo"}</span>
            </div>
          ))
        ) : (
          <p>No hay cursos asignados a esta cohorte.</p>
        )}
      </div>
    </div>
  );
};

export default Module;
