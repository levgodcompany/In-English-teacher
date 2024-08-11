import { useEffect, useState } from "react";
import styles from "./Module.module.css";
import CohortService from "../../../../services/Cohort.service";
import { ModuleInfoBasic } from "../../../../../types/Modules.types";
import ModulesService from "../../../../../Modules/services/Modules.service";

interface ModuleProps {
  idCohort: number;
  idCourse: number;
}

const Module: React.FC<ModuleProps> = ({ idCohort, idCourse }) => {
  const [modules, setModules] = useState<ModuleInfoBasic[]>([]);
  const [formData, setFormData] = useState<number>(0);

  useEffect(() => {
    fetchModules();
  }, [idCourse]);

  const fetchModules = async () => {
    try {
      const service = ModulesService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<ModuleInfoBasic[]>();
      const f = result.filter(c=> c.idCourse == idCourse);
      setModules(f);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(Number(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CohortService.httpAssignUpdate(`${idCohort}/module/${formData}`);
    } catch (error) {
      console.error("Error assigning module:", error);
      alert("Failed to assign module. Please try again.");
    }
  };

  return (
    <div className={styles.container_module}>
      <form onSubmit={handleSubmit} className={styles.cohortForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Módulo:</label>
          <select
            id="idModule"
            name="idModule"
            value={formData}
            className={styles.selectInput}
            onChange={handleChange}
            required
          >
            <option value={0}>Seleccionar Módulo</option>
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Asignar esta cohorte a este Modulo</button>
        </div>
      </form>
    </div>
  );
};

export default Module;
