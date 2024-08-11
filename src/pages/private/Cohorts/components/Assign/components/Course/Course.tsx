import { useEffect, useState } from "react";
import styles from "./Course.module.css";
import CohortService from "../../../../services/Cohort.service";
import {
  CohortCourse,
  CourseInfoBasic,
} from "../../../../../types/Courses.types";
import CoursesService from "../../../../../Courses/services/Courses.service";
import Module from "../Module/Module";

interface CourseProps {
  idCohort: number;
  idUnit: number;
}

const Course: React.FC<CourseProps> = ({ idCohort, idUnit }) => {
  const [coursesFilter, setCoursesFilter] = useState<CourseInfoBasic[]>([]);
  const [formData, setFormData] = useState<number>(0);
  const [cohortsCourses, setCohortsCourses] = useState<CohortCourse[]>([]);

  useEffect(() => {
    fetchCourses();
    fetchCohortsAndCourses();
  }, [idUnit]);

  const fetchCourses = async () => {
    try {
      const service = CoursesService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<CourseInfoBasic[]>();
      const f = result.filter((c) => c.idUnit == idUnit);
      setCoursesFilter(f);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchCohortsAndCourses = async () => {
    try {
      const service = CohortService.crud();
      service.setUrl(`/cohort-course/${idCohort}`);
      const result = await service.findAll<CohortCourse[]>();
      setCohortsCourses(result);
    } catch (error) {
      console.error("Error fetching levels:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(Number(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CohortService.httpAssignUpdate(`${idCohort}/course/${formData}`);
    } catch (error) {
      console.error("Error assigning course:", error);
      alert("Failed to assign course. Please try again.");
    }
  };

  return (
    <div className={styles.container_course}>
      <div className={styles.container_table}>
        <table className={styles.cohortsTable}>
          <thead>
            <tr className={styles.table_header}>
              <th>Cohorte</th>
              <th>Curso</th>
            </tr>
          </thead>
          <tbody>
            {cohortsCourses.map((cohort, i) => (
              <tr key={i} className={styles.table_row}>
                <td className={styles.table_cell}>{cohort.cohort.title}</td>
                <td className={styles.table_cell}>{cohort.courses.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      <div>
        {formData > 0 ? (
          <>
            <p>Asignar Modulo</p>
            <Module idCohort={idCohort} idCourse={formData} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Course;
