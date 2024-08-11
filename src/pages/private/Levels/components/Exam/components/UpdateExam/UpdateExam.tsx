import { useEffect, useState } from "react";
import { ExamLevel, ExamLevelCreate } from "../../../../../types/ExamsLevels.types";
import { TeacherInfoBasic } from "../../../../../types/Teachers.types";
import { LevelInfoBasic } from "../../../../../types/Levels.types";
import TeachersService from "../../../../services/Teachers.service";
import LevelsService from "../../../../services/Levels.service";
import ExamService from "../../../../services/Exam.service";
import styles from "./NewExam.module.css"

interface NewExamProps {
  fetchExams: () => void;
  exam: ExamLevelCreate;
  idExam: number;
}
const NewExam: React.FC<NewExamProps> = ({ fetchExams, exam, idExam }) => {
  const [teachers, setTeachers] = useState<TeacherInfoBasic[]>([]);
  const [levels, setLevels] = useState<LevelInfoBasic[]>([]);
  const [newExam, setNewExam] = useState<ExamLevelCreate>(exam);

  useEffect(() => {
    fetchTeachers();
    fetchLevels();
    setNewExam(exam)
  }, []);

  const fetchTeachers = async () => {
    try {
      const service = TeachersService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<TeacherInfoBasic[]>();
      setTeachers(result);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const fetchLevels = async () => {
    try {
      const service = LevelsService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<LevelInfoBasic[]>();
      setLevels(result);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      const service = ExamService.crud()
      await service.update<ExamLevel>(idExam, newExam);
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
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Nivel:</label>
          <select
            id="idLevel"
            name="idLevel"
            value={newExam.idLevel}
            onChange={handleInputChange}
            required
          >
            <option value={0}>Seleccionar Nivel</option>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Profesor:</label>
          <select
            id="idTeacher"
            name="idTeacher"
            value={newExam.idTeacher}
            onChange={handleInputChange}
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
    </div>
  );
};

export default NewExam;
