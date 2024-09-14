import { useEffect, useState } from "react";
import { Cohort } from "../types/Cohorts.types";
import CohortService from "./services/Cohort.service";
import styles from "./Cohorts.module.css";
import CohortCreate from "./components/CohortCreate/CohortCreate";
import Assign from "./components/Assign/Assign";
import CohortInfo from "./components/Cohort/Cohort";
import { useParams } from "react-router-dom";
import Navigation from "../../../components/Navigation/Navigation";


const Cohorts = () => {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [idCohortSelect, setIdCohortSelect] = useState<number | null>(null);
  const [idCohortSelectAssig, setIdCohortSelectAssig] = useState<number | null>(
    null
  );
  const { idLevel } = useParams<{
    idLevel: string;
  }>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetchCohorts();
  };

  const fetchCohorts = async () => {
    try {
      const api = CohortService.crud();
      api.setUrl(`/${idLevel}`);
      const result = await api.findAll();
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
      console.error("Error deleting cohort:", error);
    }
  };

  const close = () => {
    setIdCohortSelectAssig(null);
  };

  const newCohort = () => {
    setIsCreate(!isCreate);
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <h1 className={styles.title}>Cohortes</h1>
      <div className={styles.container_buttons}>
        <button className={styles.button_create} onClick={newCohort}>
          Crear Cohorte
        </button>
      </div>
      <div className={styles.cardContainer}>
        {cohorts.map((cohort) => (
          <div key={cohort.id} className={styles.cohortCard}>
            <h2 className={styles.cohortTitle}>{cohort.title}</h2>
            <p className={styles.cohortDescription}>{cohort.description}</p>
            <p className={styles.cohortDates}>
              <strong>Fecha Inicio:</strong>{" "}
              {new Date(cohort.startDate).toLocaleDateString()}
            </p>
            <p className={styles.cohortDates}>
              <strong>Fecha Fin:</strong>{" "}
              {new Date(cohort.endDate).toLocaleDateString()}
            </p>
            <p className={styles.cohortDates}>
              <strong>Inscripción Inicio:</strong>{" "}
              {new Date(cohort.registrationStartDate).toLocaleDateString()}
            </p>
            <p className={styles.cohortDates}>
              <strong>Inscripción Fin:</strong>{" "}
              {new Date(cohort.registrationEndDate).toLocaleDateString()}
            </p>
            <div className={styles.cohortActions}>
              <button onClick={() => fetchDelete(cohort.id)}>Eliminar</button>
              <button>Actualizar</button>
              <button onClick={() => setIdCohortSelectAssig(cohort.id)}>
                Asignar
              </button>
              <button onClick={() => setIdCohortSelect(cohort.id)}>Info</button>
            </div>
          </div>
        ))}
      </div>

      {idCohortSelectAssig && idCohortSelectAssig > 0 ? (
        <Assign idCohort={idCohortSelectAssig} close={close} />
      ) : null}
      {idCohortSelect ? <CohortInfo idCohort={idCohortSelect} /> : null}

      <div className={styles.container_create}>
        {isCreate ? (
          <CohortCreate
            idLevel={Number(idLevel)}
            close={newCohort}
            fetchCohorts={fetchData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Cohorts;
