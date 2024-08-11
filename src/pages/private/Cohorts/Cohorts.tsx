import { useEffect, useState } from "react";
import { Cohort } from "../types/Cohorts.types";
import CohortService from "./services/Cohort.service";
import styles from "./Cohorts.module.css";
import CohortCreate from "./components/CohortCreate/CohortCreate";
import { LevelInfoBasic } from "../types/Levels.types";
import LevelsService from "../Levels/services/Levels.service";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Assign from "./components/Assign/Assign";

interface CohortAndLevel {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  level: string;
  idLevel: number;
}

const Cohorts = () => {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [cohortsAndLevel, setCohortsAndLevel] = useState<CohortAndLevel[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [levels, setLevels] = useState<LevelInfoBasic[]>([]);
  const [idCohortSelect, setIdCohortSelect] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetchCohorts();
    await fetchLevels();
  };
  useEffect(() => {
    combineCohortsAndLevels();
  }, [levels]);

  const fetchCohorts = async () => {
    try {
      const result = await CohortService.crud().findAll();
      setCohorts(result);
    } catch (error) {
      console.error("Error fetching cohorts:", error);
    }
  };

  const fetchDelete = async (idCohort: number) => {
    try {
      const service = CohortService.crud();
      await service.delete(idCohort);
      fetchData();
    } catch (error) {
      console.error("Error fetching cohorts:", error);
    }
  };

  const fetchLevels = async () => {
    try {
      const service = LevelsService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<LevelInfoBasic[]>();
      setLevels(result);
    } catch (error) {
      console.error("Error fetching levels:", error);
    }
  };

  const combineCohortsAndLevels = () => {
    if (cohorts.length > 0 && levels.length > 0) {
      const cl: CohortAndLevel[] = cohorts.map((cohort) => {
        const level = levels.find((l) => l.id === cohort.idLevel);
        return {
          ...cohort,
          level: level ? level.title : "Sin nivel",
        };
      });
      setCohortsAndLevel(cl);
    }
  };

  const close = ()=> {
    setIdCohortSelect(null)
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <h1 className={styles.title}>Cohortes</h1>
      <div className={styles.container_buttons}>
        <button
          className={styles.button_create}
          onClick={() => setIsCreate(!isCreate)}
        >
          Crear Cohorte
        </button>
      </div>
      <div className={styles.container_table}>
        <table className={styles.cohortsTable}>
          <thead>
            <tr className={styles.table_header}>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Inicio de Inscripción</th>
              <th>Fin de la inscripción</th>
              <th>Nivel</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cohortsAndLevel.map((cohort) => (
              <tr
                
                key={cohort.id}
                className={styles.table_row}
              >
                <td className={styles.table_cell}>{cohort.id}</td>
                <td className={styles.table_cell}>{cohort.title}</td>
                <td className={styles.table_cell}>{cohort.description}</td>
                <td className={styles.table_cell}>
                  {new Date(cohort.startDate).toLocaleDateString()}
                </td>
                <td className={styles.table_cell}>
                  {new Date(cohort.endDate).toLocaleDateString()}
                </td>
                <td className={styles.table_cell}>
                  {new Date(cohort.registrationStartDate).toLocaleDateString()}
                </td>
                <td className={styles.table_cell}>
                  {new Date(cohort.registrationEndDate).toLocaleDateString()}
                </td>
                <td className={styles.table_cell}>{cohort.level}</td>
                <td className={styles.table_cell}>
                  <button onClick={() => fetchDelete(cohort.id)}>
                    Eliminar
                  </button>
                </td>
                <td className={styles.table_cell}>
                  <button>Actualizar</button>
                </td>
                <td className={styles.table_cell}>
                  <button onClick={() => setIdCohortSelect(cohort.id)}>Asignar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>{idCohortSelect ? <Assign close={close} idCohort={idCohortSelect} /> : <></>}</div>
      <div className={styles.container_create}>
        {isCreate ? (
          <CohortCreate levels={levels} fetchCohorts={fetchData} />
        ) : null}
      </div>
    </div>
  );
};

export default Cohorts;
