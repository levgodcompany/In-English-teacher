import { useState } from "react";
import styles from "./CohortCreate.module.css";
import { CohortCreate as CohortCreateType } from "../../../types/Cohorts.types";
import CohortService from "../../services/Cohort.service";
import { LevelInfoBasic } from "../../../types/Levels.types";

interface CohortCreateProps {
  fetchCohorts: () => void;
  levels: LevelInfoBasic[]
}

const CohortCreate: React.FC<CohortCreateProps> = ({ fetchCohorts, levels }) => {
  const [formData, setFormData] = useState<CohortCreateType>({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    registrationStartDate: new Date(),
    registrationEndDate: new Date(),
    idLevel: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes("Date") ? new Date(value) : value,
    });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.classList.add(styles.focusedInput);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.classList.remove(styles.focusedInput);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CohortService.crud().create(formData);
      fetchCohorts();
    } catch (error) {
      console.error("Error creating cohort:", error);
      alert("Failed to create cohort. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.cohortForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nivel:</label>
          <select
            id="idLevel"
            name="idLevel"
            value={formData.idLevel}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={styles.selectInput}
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
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Titulo:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={styles.textInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Descripcion:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={styles.textArea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Fecha Inicio:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate.toISOString().split("T")[0]}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={styles.dateInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Fecha Fin:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate.toISOString().split("T")[0]}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={styles.dateInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Inicio de Inscripción:</label>
          <input
            type="date"
            name="registrationStartDate"
            value={formData.registrationStartDate.toISOString().split("T")[0]}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={styles.dateInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Fin de la inscripción:</label>
          <input
            type="date"
            name="registrationEndDate"
            value={formData.registrationEndDate.toISOString().split("T")[0]}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={styles.dateInput}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Crear Cohorte
        </button>
      </form>
    </div>
  );
};

export default CohortCreate;
