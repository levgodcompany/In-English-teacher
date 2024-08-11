import { useEffect, useState } from "react";
import {
  CohortAndUnit,
  UnitInfoBasic,
} from "../../../../../types/Unities.types";
import UnitiesService from "../../../../../Unities/services/Unities.service";
import styles from "./Unit.module.css";
import CohortService from "../../../../services/Cohort.service";
import Course from "../Course/Course";
interface UnitPorps {
  idCohort: number;
}
const Unit: React.FC<UnitPorps> = ({ idCohort }) => {
  const [unities, setUnities] = useState<UnitInfoBasic[]>([]);
  const [cohortsUnities, setCohortsUnities] = useState<CohortAndUnit[]>([]);
  const [formData, setFormData] = useState<number>(0);
  useEffect(() => {
    fetchUnites();
    fetchCohortsAndUnities();
  }, []);

  const fetchUnites = async () => {
    try {
      const service = UnitiesService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<UnitInfoBasic[]>();
      setUnities(result);
    } catch (error) {
      console.error("Error fetching levels:", error);
    }
  };

  const fetchCohortsAndUnities = async () => {
    try {
      const service = CohortService.crud();
      service.setUrl(`/cohort-unit/${idCohort}`);
      const result = await service.findAll<CohortAndUnit[]>();
      setCohortsUnities(result);
    } catch (error) {
      console.error("Error fetching levels:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(Number(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CohortService.httpAssignUpdate(`${idCohort}/unit/${formData}`);
      fetchCohortsAndUnities();
    } catch (error) {
      console.error("Error creating cohort:", error);
      alert("Failed to create cohort. Please try again.");
    }
  };

  return (
    <div className={styles.container_unit}>
      <div>
        <div className={styles.container_table}>
          <table className={styles.cohortsTable}>
            <thead>
              <tr className={styles.table_header}>
                <th>Cohorte</th>
                <th>Unidad</th>
              </tr>
            </thead>
            <tbody>
              {cohortsUnities.map((cohort, i) => (
                <tr key={i} className={styles.table_row}>
                  <td className={styles.table_cell}>{cohort.cohort.title}</td>
                  <td className={styles.table_cell}>{cohort.unities.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.cohortForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Unidad:</label>
          <select
            id="idLevel"
            name="idLevel"
            value={formData}
            className={styles.selectInput}
            onChange={handleChange}
            required
          >
            <option value={0}>Seleccionar Nivel</option>
            {unities.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Asignar esta cohorte a esta Unidad</button>
        </div>
      </form>
      <div>
        {formData > 0 ? (
          <>
            <p>Asignar Curso</p>
            <Course idCohort={idCohort} idUnit={formData} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Unit;
