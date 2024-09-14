import { useState } from "react";
import styles from "./Teacher.module.css";
import CohortService from "../../../../services/Cohort.service";
import { TeacherInfoBasic } from "../../../../../types/Teachers.types";
import TeachersService from "../../../../../Levels/services/Teachers.service";
import { CohortTeacherRelationshipDTO } from "../../types/Assign.type";

interface TeacherProps {
  idCohort: number;
  teacherAssigs: CohortTeacherRelationshipDTO[] | undefined;
}

const Teacher: React.FC<TeacherProps> = ({ idCohort, teacherAssigs }) => {
  const [teachers, setTeachers] = useState<TeacherInfoBasic[]>([]);
  const [formData, setFormData] = useState<number | "">(""); // Estado para manejar la selección de profesor
  const [isLoad, setIsLoad] = useState<boolean>(false);

  // Función para obtener la lista de profesores
  const fetchTeachers = async () => {
    try {
      const service = TeachersService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<TeacherInfoBasic[]>();
      setTeachers(result);
      setIsLoad(true);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Manejar el cambio en la selección del profesor
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(Number(e.target.value));
  };

  // Manejar la asignación de un nuevo profesor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData === "" || formData === 0) {
      alert("Por favor, selecciona un profesor válido.");
      return;
    }
    try {
      await CohortService.httpAssignUpdate(`${idCohort}/teacher/${formData}`);
      alert("Profesor asignado correctamente.");
      setFormData(""); // Resetear el valor después de asignar
    } catch (error) {
      alert("Error al asignar profesor. Inténtalo de nuevo.");
    }
  };

  const loadOnClick = () => {
    fetchTeachers();
  };

  return (
    <div className={styles.container_teacher}>
      {/* Mostrar profesores ya asignados */}
      <div className={styles.assignedTeachers}>
        <h3>Profesores Asignados</h3>
        <div className={styles.containerAssignedTeachers}>
          {teacherAssigs && teacherAssigs.length > 0 ? (
            teacherAssigs.map((teacher) => (
              <div key={teacher.idTeacher} className={styles.teacherCard}>
                <p>
                  <strong>
                    {teacher.name} {teacher.lastName}
                  </strong>
                </p>
                <p>{teacher.email}</p>
                <div>
                  <button>Eliminar</button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay profesores asignados.</p>
          )}
        </div>
      </div>

      {isLoad ? (
        <form onSubmit={handleSubmit} className={styles.cohortForm}>
          <div className={styles.formGroup}>
            <label htmlFor="idTeacher" className={styles.formLabel}>
              Asignar nuevo profesor:
            </label>
            <select
              id="idTeacher"
              name="idTeacher"
              value={formData}
              className={styles.selectInput}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar Profesor</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.fullName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Asignar Profesor
          </button>
        </form>
      ) : (
        <button onClick={loadOnClick}>Asignar Profesor</button>
      )}

      {/* Formulario para asignar un nuevo profesor */}
    </div>
  );
};

export default Teacher;
