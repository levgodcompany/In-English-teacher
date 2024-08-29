import { useEffect, useState } from "react";
import { StudentAndLevels } from "../types/Students.types";
import StudentsServices from "./services/Student.service";
import styles from "./Students.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getStatus } from "../../../utilities/Status";

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
  function calculateAge(birthDate: string) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    // Ajustar si el cumpleaños no ha pasado aún este año
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }


  const fetchStudentActive = async (idStudent: number) =>{
    try {
      await StudentsServices.active(idStudent, '001');
      // app.setUrl(`active/${idStudent}/001`);
      // await app.update<string, string>('', '')
      fetchStudents();
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <p>Alumnos pre registrados</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Edad</th>
            <th>Status</th>
            <th>Dar Permiso</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((s) => ['014', '003', '005', '007', '012', '015'].includes(s.status))
            .flatMap((student) => (
              <tr key={`${student.id}`}>
                <td>{student.name}</td>
                <td>{student.lastName}</td>
                <td>{student.dni}</td>
                <td>{student.email}</td>
                <td>{student.tel}</td>
                <td>{calculateAge(student.birthDate)}</td>
                <td>{getStatus(student.status)?.value} - {student.status}</td>
                <td><button onClick={()=>fetchStudentActive(student.id)}>Permitir</button></td>
              </tr>
            ))}
        </tbody>
      </table>
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
                {/* <td>{viewStatus(student.status)}</td> */}
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
