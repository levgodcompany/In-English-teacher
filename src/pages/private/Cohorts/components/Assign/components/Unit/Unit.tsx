import { useState } from "react";
import { UnitInfoBasic } from "../../../../../types/Unities.types";
import UnitiesService from "../../../../../Unities/services/Unities.service";
import CohortService from "../../../../services/Cohort.service";
import { CohortUnitRelationshipDTO } from "../../types/Assign.type";
import styles from "./Unit.module.css";

interface UnitProps {
  idCohort: number;
  unitAssing: CohortUnitRelationshipDTO[] | undefined;
  selectUnit: (id: number) => void;
}

const Unit: React.FC<UnitProps> = ({ idCohort, unitAssing, selectUnit }) => {
  const [unities, setUnities] = useState<UnitInfoBasic[]>([]);
  const [formData, setFormData] = useState<number | "">(""); // Inicializar como cadena vacía
  const [isLoadUnit, setIsLoadUnits] = useState<boolean>(false);

  // useEffect(() => {

  // }, []);

  // Obtener todas las unidades
  const fetchUnites = async () => {
    try {
      const service = UnitiesService.crud();
      service.setUrl(`/info-basic`);
      const result = await service.findAll<UnitInfoBasic[]>();
      setUnities(result);
      setIsLoadUnits(true);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  // Manejar el cambio de selección de la unidad
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(Number(e.target.value));
  };

  // Asignar una nueva unidad al cohorte
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData === "" || formData === 0) {
      alert("Por favor, selecciona una unidad válida.");
      return;
    }
    try {
      await CohortService.httpAssignUpdate(
        `cohort-unit/assign/${idCohort}/unit/${formData}`
      );
      alert("Unidad asignada correctamente.");
      setFormData(""); // Reiniciar selección tras la asignación
    } catch (error) {
      alert("Error al asignar unidad. Inténtalo de nuevo.");
    }
  };

  const assigUnits = async () => {
    fetchUnites();
  };

  const enabledOnClick = async (idUnit: number, enabled: boolean) => {
    await UnitiesService.enable(idCohort, idUnit, !enabled);
  };

  const handleDelete = async (idCohort: number, idUnit: number) => {
    await UnitiesService.deleteAssignCohort(idCohort, idUnit);
  };

  return (
    <div className={styles.container_unit}>
      {/* Mostrar unidades ya asignadas */}
      <div className={styles.assignedUnits}>
        <h3>Unidades Asignadas</h3>
        <div className={styles.containerAssignedUnits}>
          {unitAssing && unitAssing.length > 0 ? (
            unitAssing.map((unit) => (
              <div key={unit.idUnit} className={styles.unitCard}>
                <p>
                  <strong>
                    {unit.titleLevel}- {unit.title}
                  </strong>
                </p>
                <p>{unit.enabled ? "Activo" : "Inactivo"}</p>
                <div>
                  <button onClick={() => handleDelete(idCohort, unit.idUnit)}>
                    Eliminar
                  </button>
                  <button
                    onClick={() => enabledOnClick(unit.idUnit, unit.enabled)}
                  >
                    {unit.enabled ? "Desabilitar" : "Activar"}
                  </button>
                  <button onClick={() => selectUnit(unit.idUnit)}>
                    Cursos
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay unidades asignadas.</p>
          )}
        </div>
      </div>

      <div>
        {isLoadUnit ? (
          <form onSubmit={handleSubmit} className={styles.cohortForm}>
            <div className={styles.formGroup}>
              <label htmlFor="idUnit" className={styles.formLabel}>
                Asignar nueva unidad:
              </label>
              <select
                id="idUnit"
                name="idUnit"
                value={formData}
                className={styles.selectInput}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar Unidad</option>
                {unities.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.title}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className={styles.submitButton}>
              Asignar Unidad
            </button>
          </form>
        ) : (
          <button onClick={assigUnits}>Asignar Unidades</button>
        )}
      </div>
      {/* Formulario para asignar una nueva unidad */}
    </div>
  );
};

export default Unit;
