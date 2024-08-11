import { useEffect, useState } from "react";
import StudentService from "../../../../../Students/services/Student.service";
import styles from "./Student.module.css";
import CohortService from "../../../../services/Cohort.service";
import { StudentInfoBasic } from "../../../../../types/Students.types";

interface StudentProps {
  idCohort: number;
}

const Student: React.FC<StudentProps> = ({ idCohort }) => {
  const [students, setStudents] = useState<StudentInfoBasic[]>([]);
  const [formData, setFormData] = useState<number>(0);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const service = StudentService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<StudentInfoBasic[]>();
      setStudents(result);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(Number(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CohortService.httpAssignUpdate(`${idCohort}/student/${formData}`);
    } catch (error) {
      console.error("Error assigning student:", error);
      alert("Failed to assign student. Please try again.");
    }
  };

  return (
    <div className={styles.container_student}>
      <form onSubmit={handleSubmit} className={styles.cohortForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Estudiante:</label>
          <select
            id="idStudent"
            name="idStudent"
            value={formData}
            className={styles.selectInput}
            onChange={handleChange}
            required
          >
            <option value={0}>Seleccionar Estudiante</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.fullName}
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

export default Student;
