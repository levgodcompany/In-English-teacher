import { useEffect, useState } from "react";
import { ExamWithDetails } from "../../../types/ExamsLevels.types";
import ExamService from "../../services/Exam.service";
import styles from "./Exam.module.css";
import NewExam from "./components/NewExam/NewExam";

interface ExamPorps {
  idLevel: number;
}
const Exam: React.FC<ExamPorps> = ({ idLevel }) => {
  const [exams, setExams] = useState<ExamWithDetails[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  useEffect(() => {
    fetchExams();
    setIsCreate(false);
    if (idLevel > 0) {
      setExams((prev) => {
        if (prev && prev.length > 0) {
          prev = prev.filter((e) => e.idLevel == idLevel);
        }
        return prev;
      });
    }
  }, [idLevel]);

  const fetchExams = async () => {
    try {
      const service = ExamService.crud();
      service.setUrl(`/level/${idLevel}`);
      const result = await service.findAll<ExamWithDetails[]>();
      setExams(result);
    } catch (error) {
      console.error("Error fetching exams:", error);
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
      {isCreate ? <NewExam fetchExams={fetchExams} /> : <></>}
    </div>
  );
};

export default Exam;
