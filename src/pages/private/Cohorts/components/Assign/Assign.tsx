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

  const [showClassOnlive, setShowClassOnlive] = useState(false);
  const [showUnit, setShowUnit] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showModules, setShowModules] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [showTeachers, setShowTeachers] = useState(false);

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
          <button onClick={() => close()}>Cerrar</button>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle} onClick={() => setShowClassOnlive(!showClassOnlive)}>
            Asignar Clase
          </p>
          {showClassOnlive && (
            <div className={styles.content}>
              <ClassOnlive
                classOnliveAssign={cohort?.classOnlives}
                idCohort={idCohort}
              />
            </div>
          )}
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle} onClick={() => setShowUnit(!showUnit)}>
            Asignar Unidad
          </p>
          {showUnit && (
            <div className={styles.content}>
              <Unit
                selectUnit={setSelectUnit}
                unitAssing={cohort?.cohortUnities}
                idCohort={idCohort}
              />
            </div>
          )}
        </div>

        {selectUnit && (
          <div className={styles.section}>
            <p className={styles.sectionTitle} onClick={() => setShowCourses(!showCourses)}>
              Asignar Cursos
            </p>
            {showCourses && (
              <div className={styles.content}>
                <Course
                  courseAssing={filterCoursesByIdUnit()}
                  idCohort={idCohort}
                  idUnit={selectUnit}
                  selectCourse={setSelectCourse}
                />
              </div>
            )}
          </div>
        )}

        {selectUnit && selectCourse && (
          <div className={styles.section}>
            <p className={styles.sectionTitle} onClick={() => setShowModules(!showModules)}>
              Asignar Módulos
            </p>
            {showModules && (
              <div className={styles.content}>
                <Module
                  idCohort={idCohort}
                  modulesAssig={filterModulesByIdCourse()}
                  idCourse={selectCourse}
                />
              </div>
            )}
          </div>
        )}

        <div className={styles.section}>
          <p className={styles.sectionTitle} onClick={() => setShowStudents(!showStudents)}>
            Asignar Estudiante
          </p>
          {showStudents && (
            <div className={styles.content}>
              <Student
                studentAssing={cohort?.cohortStudents}
                idCohort={idCohort}
              />
            </div>
          )}
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle} onClick={() => setShowTeachers(!showTeachers)}>
            Asignar Profesor
          </p>
          {showTeachers && (
            <div className={styles.content}>
              <Teacher
                teacherAssigs={cohort?.cohortTeachers}
                idCohort={idCohort}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assign;
