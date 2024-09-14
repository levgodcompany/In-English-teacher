import { useState } from "react";
import styles from "./Course.module.css";
import CohortService from "../../../../services/Cohort.service";
import { CourseInfoBasic } from "../../../../../types/Courses.types";
import CoursesService from "../../../../../Courses/services/Courses.service";
import { CohortCourseRelationshipDTO } from "../../types/Assign.type";

interface CourseProps {
  idCohort: number;
  idUnit: number;
  courseAssing: CohortCourseRelationshipDTO[] | undefined;
  selectCourse: (select: number)=> void;
}

const Course: React.FC<CourseProps> = ({ idCohort, idUnit, courseAssing, selectCourse }) => {
  const [coursesFilter, setCoursesFilter] = useState<CourseInfoBasic[]>([]);
  const [formData, setFormData] = useState<number>(0);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const fetchCourses = async () => {
    try {
      const service = CoursesService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<CourseInfoBasic[]>();

      // Filtrar cursos por unidad
      const filteredCourses = result.filter((c) => c.idUnit === idUnit);

      setCoursesFilter(filteredCourses);
      setIsLoad(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(Number(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData === 0) {
      alert("Por favor, selecciona un curso.");
      return;
    }
    try {
      await CohortService.httpAssignUpdate(`${idCohort}/course/${formData}`);
      alert("Curso asignado correctamente.");
    } catch (error) {
      console.error("Error assigning course:", error);
      alert("No se pudo asignar el curso. Por favor, intenta nuevamente.");
    }
  };

  const assigCourses = () => {
    fetchCourses();
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
              {coursesFilter.map((course) => (
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
        {courseAssing && courseAssing.length > 0 ? (
          courseAssing.map((course) => (
            <div key={course.idCourse} className={styles.courseCard}>
              <h3>{course.title}</h3>
              <p>{course.titleUnit}</p>
              <span>{course.enabled ? "Activo" : "Inactivo"}</span>
              <div>
                <button>Eliminar</button>
                <button onClick={()=> selectCourse(course.idCourse)} >Modulos</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay cursos asignados a esta cohorte.</p>
        )}
      </div>
    </div>
  );
};

export default Course;
