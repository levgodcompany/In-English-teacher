import { useEffect, useState } from "react";
import styles from "./Teacher.module.css";
import CohortService from "../../../../services/Cohort.service";
import { TeacherInfoBasic } from "../../../../../types/Teachers.types";
import TeachersService from "../../../../../Levels/services/Teachers.service";

interface TeacherProps {
  idCohort: number;
}

const Teacher: React.FC<TeacherProps> = ({ idCohort }) => {
  const [teachers, setTeachers] = useState<TeacherInfoBasic[]>([]);
  const [formData, setFormData] = useState<number>(0);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const service = TeachersService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<TeacherInfoBasic[]>();
      setTeachers(result);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(Number(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CohortService.httpAssignUpdate(`${idCohort}/teacher/${formData}`);
    } catch (error) {
      console.error("Error assigning teacher:", error);
      alert("Failed to assign teacher. Please try again.");
    }
  };

  return (
    <div className={styles.container_teacher}>
      <form onSubmit={handleSubmit} className={styles.cohortForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Profesor:</label>
          <select
            id="idTeacher"
            name="idTeacher"
            value={formData}
            className={styles.selectInput}
            onChange={handleChange}
            required
          >
            <option value={0}>Seleccionar Profesor</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.fullName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Asignar</button>
        </div>
      </form>
    </div>
  );
};

export default Teacher;
