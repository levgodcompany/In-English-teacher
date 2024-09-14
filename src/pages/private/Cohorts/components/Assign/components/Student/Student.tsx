import { useState } from "react";
import StudentService from "../../../../../Students/services/Student.service";
import CohortService from "../../../../services/Cohort.service";
import { StudentInfoBasic } from "../../../../../types/Students.types";
import { CohortStudentRelationshipDTO } from "../../types/Assign.type";
import styles from "./Student.module.css";

interface StudentProps {
  idCohort: number;
  studentAssing: CohortStudentRelationshipDTO[] | undefined;
}

const Student: React.FC<StudentProps> = ({ idCohort, studentAssing }) => {
  const [students, setStudents] = useState<StudentInfoBasic[]>([]);
  const [formData, setFormData] = useState<number | "">(""); // Estado para manejar la selección del estudiante
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const loadOnClick = () => {
    fetchStudents();
  };

  // Función para obtener la lista de estudiantes
  const fetchStudents = async () => {
    try {
      const service = StudentService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<StudentInfoBasic[]>();
      setStudents(result);
      setIsLoad(true);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Manejar el cambio en la selección del estudiante
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(Number(e.target.value));
  };

  // Manejar la asignación de un nuevo estudiante
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData === "" || formData === 0) {
      alert("Por favor, selecciona un estudiante válido.");
      return;
    }
    try {
      await CohortService.httpAssignUpdate(`${idCohort}/student/${formData}`);
      alert("Estudiante asignado correctamente.");
      setFormData(""); // Resetear el valor después de asignar
    } catch (error) {
      console.error("Error assigning student:", error);
      alert("Error al asignar estudiante. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.container_student}>
      {/* Mostrar estudiantes ya asignados */}
      <div className={styles.assignedStudents}>
        <h3>Estudiantes Asignados</h3>
        <div className={styles.containerAssignedStudent}>
          {studentAssing && studentAssing.length > 0 ? (
            studentAssing.map((student) => (
              <div key={student.idStudent} className={styles.studentCard}>
                <p>
                  <strong>
                    {student.name} {student.lastName}
                  </strong>
                </p>
                <p>{student.email}</p>
                <p>
                  status:{" "}
                  <strong>{student.enabled ? "Activo" : "Inactivo"}</strong>
                </p>
                <div>
                  <button>Eliminar</button>
                  <button>{student.enabled ? "Inactivar" : "Activar"}</button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay estudiantes asignados.</p>
          )}
        </div>
      </div>

      {isLoad ? (
        <form onSubmit={handleSubmit} className={styles.cohortForm}>
          <div className={styles.formGroup}>
            <label htmlFor="idStudent" className={styles.formLabel}>
              Asignar nuevo estudiante:
            </label>
            <select
              id="idStudent"
              name="idStudent"
              value={formData}
              className={styles.selectInput}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar Estudiante</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.id}. {student.fullName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Asignar Estudiante
          </button>
        </form>
      ) : (
        <button onClick={loadOnClick}>Asignar estudiante</button>
      )}

      {/* Formulario para asignar un nuevo estudiante */}
    </div>
  );
};

export default Student;
