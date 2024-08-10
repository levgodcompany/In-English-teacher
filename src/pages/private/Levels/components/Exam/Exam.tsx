import { useEffect, useState } from "react";
import {
  ExamLevelCreate,
  ExamWithDetails,
} from "../../../types/ExamsLevels.types";
import ExamService from "../../services/Exam.service";
import styles from "./Exam.module.css";
interface ExamPorps {
  idLevel: number;
}
const Exam: React.FC<ExamPorps> = ({ idLevel }) => {
  const [exams, setExams] = useState<ExamWithDetails[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [newExam, setNewExam] = useState<ExamLevelCreate>({
    idLevel: 0,
    idTeacher: 1,
    title: "",
    description: "",
    archive: "",
    passingScore: 0,
    NumberAttempts: 0,
  });

  useEffect(() => {
    fetchExams();
    if (idLevel > 0) {
      setExams((prev) => {
        prev = prev.filter((e) => e.idLevel == idLevel);
        return prev;
      });
    }
  }, []);

  useEffect(() => {

    if (idLevel > 0) {
      setExams((prev) => {
        prev = prev.filter((e) => e.idLevel == idLevel);
        return prev;
      });
    }
  }, [idLevel]);

  const fetchExams = async () => {
    try {
      const result = await ExamService.crud().findAll<ExamWithDetails[]>();
      setExams(result);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewExam({
      ...newExam,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await ExamService.crud().create(newExam);
      fetchExams(); // Actualiza la lista de exámenes después de crear uno nuevo
      setNewExam({
        idLevel: 0,
        idTeacher: 0,
        title: "",
        description: "",
        archive: "",
        passingScore: 0,
        NumberAttempts: 1,
      });
    } catch (error) {
      console.error("Error creating exam:", error);
    }
  };

  return (
    <div className={styles.container}>
      <p>Lista de Examenes</p>
      {exams.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nivel</th>
              <th>Profesor</th>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Archivo</th>
              <th>Puntuación de aprobación</th>
              <th>Número de intentos</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.level.title}</td>
                <td>
                  {exam.teacher.name} {exam.teacher.lastName}
                </td>
                <td>{exam.title}</td>
                <td>{exam.description}</td>
                <td>{exam.archive}</td>
                <td>{exam.passingScore}</td>
                <td>{exam.NumberAttempts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}

      <p>Crear nuevo examen</p>
      <button onClick={() => setIsCreate(!isCreate)}>Crear nuevo examen</button>
      {isCreate ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label>Nivel:</label>
            <input
              type="number"
              name="idLevel"
              value={newExam.idLevel}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Profesor:</label>
            <input
              type="number"
              name="idTeacher"
              value={newExam.idTeacher}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Titulo:</label>
            <input
              type="text"
              name="title"
              value={newExam.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Descripcion:</label>
            <textarea
              name="description"
              value={newExam.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Archivo URL:</label>
            <input
              type="text"
              name="archive"
              value={newExam.archive}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Puntuación de aprobación:</label>
            <input
              type="number"
              name="passingScore"
              value={newExam.passingScore}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Número de intentos:</label>
            <input
              type="number"
              name="NumberAttempts"
              value={newExam.NumberAttempts}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Crear</button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Exam;
