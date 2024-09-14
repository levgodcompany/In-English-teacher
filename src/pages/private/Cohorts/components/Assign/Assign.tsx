import { useEffect, useState } from "react";
import CohortService from "../../services/Cohort.service";
import styles from "./Assign.module.css";
import Student from "./components/Student/Student";
import Teacher from "./components/Teacher/Teacher";
import Unit from "./components/Unit/Unit";
import { CohortDTO } from "./types/Assign.type";
import Course from "./components/Course/Course";
import Module from "./components/Module/Module";
import ClassOnlive from "./components/ClassOnlive/ClassOnlive";

interface AssignProps {
  idCohort: number;
  close: () => void;
}

const Assign: React.FC<AssignProps> = ({ idCohort, close }) => {
  const [cohort, setCohort] = useState<CohortDTO | null>(null);

  const [selectUnit, setSelectUnit] = useState<number | null>(null);
  const [selectCourse, setSelectCourse] = useState<number | null>(null);

  useEffect(() => {
    fecht();
  }, [idCohort]);

  const fecht = async () => {
    try {
      const api = CohortService.crud();
      api.setUrl(`/cohort-all-info/${idCohort}`);
      const res = await api.findAll<CohortDTO>();
      if (res) {
        setCohort(res);
      }
    } catch (error) {}
  };

  const filterCoursesByIdUnit = () => {
    if (selectUnit && cohort?.cohortCourses) {
      return cohort.cohortCourses.filter((c) => c.idUnit == selectUnit);
    } else {
      return [];
    }
  };

  const filterModulesByIdCourse = () => {
    if (selectCourse && cohort?.cohortModules) {
      return cohort.cohortModules.filter((m) => m.idCourse == selectCourse);
    } else {
      return [];
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerInfo}>
        <div>
          <button onClick={()=> close()}>Cerrar</button>
        </div>


      
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Asignar Clase</p>
          <div className={styles.content}>
            <ClassOnlive
              classOnliveAssign={cohort?.classOnlives}
              idCohort={idCohort}
            />
          </div>
        </div>


        <div className={styles.section}>
          <p className={styles.sectionTitle}>Asignar Unidad</p>
          <div className={styles.content}>
            <Unit
              selectUnit={setSelectUnit}
              unitAssing={cohort?.cohortUnities}
              idCohort={idCohort}
            />
          </div>
        </div>

        {selectUnit ? (
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Asignar Cursos</p>
            <div className={styles.content}>
              <Course
                courseAssing={filterCoursesByIdUnit()}
                idCohort={idCohort}
                idUnit={selectUnit}
                selectCourse={setSelectCourse}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {selectUnit && selectCourse ? (
          <>
            <Module
              idCohort={idCohort}
              modulesAssig={filterModulesByIdCourse()}
              idCourse={selectCourse}
            />
          </>
        ) : (
          <></>
        )}

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Asignar Estudiante</p>
          <div className={styles.content}>
            <Student
              studentAssing={cohort?.cohortStudents}
              idCohort={idCohort}
            />
          </div>
        </div>

        <div className={styles.containerTeacherStudent}>
          <div className={styles.section}>
            {/* <p className={styles.sectionTitle}>Asignar Profesor</p> */}
            <div className={styles.content}>
              <Teacher
                teacherAssigs={cohort?.cohortTeachers}
                idCohort={idCohort}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assign;
