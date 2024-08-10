import { useEffect, useState } from "react";
import { StudentAndLevels } from "../types/Students.types";
import StudentsServices from "./services/Student.service";
import styles from "./Students.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";

const Students = () => {
  const [students, setStudents] = useState<StudentAndLevels[]>([]);

  const fetchStudents = async () => {
    try {
      const app = StudentsServices.crud();
      app.setUrl(`/levels`);
      const res = await app.findAll<StudentAndLevels[]>();
      setStudents(res);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Status ID</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          {students.flatMap((student) =>
            student.levels.map((level) => (
              <tr key={`${student.id}-${level.levelId}`}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.idStatus}</td>
                <td>{level.level.title}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
