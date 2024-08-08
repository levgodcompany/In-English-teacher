import { useEffect, useState } from "react";
import { Unit, UnitCreate } from "../../types/Unities.types";
import UnitiesService from "./services/Unities.service";
import style from "./Unities.module.css";

interface UnitiesProps {
  idLevel: number;
  titleLevel: string;
}

const Unities: React.FC<UnitiesProps> = ({ idLevel, titleLevel }) => {
  const [unities, setUnities] = useState<Unit[]>([]);
  const [currentUnit, setCurrentUnit] = useState<Unit>({
    id: 0,
    idLevel,
    title: "",
    description: "",
    order: 0,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    fetchUnities();
  }, []);

  const fetchUnities = async () => {
    try {
      const app = UnitiesService.crud();
      app.setUrl(`level/${idLevel}`);
      const res = await app.findAll();
      setUnities(res);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const app = UnitiesService.crud();
      await app.create<UnitCreate>({ ...currentUnit, idLevel });
      setCurrentUnit({ id: 0, idLevel, title: "", description: "", order: 0 });
      setIsCreate(false);
      fetchUnities(); // Refresca la lista de unidades
    } catch (error) {
      console.error("Error creating unit:", error);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const app = UnitiesService.crud();
      await app.update(currentUnit.id, currentUnit);
      setCurrentUnit({ id: 0, idLevel, title: "", description: "", order: 0 });
      setIsEdit(false);
      fetchUnities(); // Refresca la lista de unidades
    } catch (error) {
      console.error("Error updating unit:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentUnit((prev) => ({ ...prev, [name]: value }));
  };

  const renderForm = () => (
    <div className={style.container_new}>
      <p className={style.container_new_title}>
        {isEdit ? "Editar Unidad" : "Crear Unidad"}
      </p>
      <form
        className={style.form}
        onSubmit={isEdit ? handleEdit : handleCreate}
      >
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="title">
            Título *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={style.form_input}
            value={currentUnit.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            className={style.form_input}
            value={currentUnit.description}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="order">
            Orden *
          </label>
          <input
            type="number"
            id="order"
            name="order"
            className={style.form_input}
            value={currentUnit.order}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className={style.form_button} type="submit">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );

  const handleEditClick = (unit: Unit) => {
    setCurrentUnit(unit);
    setIsEdit(true);
    setIsCreate(false);
  };

  const handleCreateClick = () => {
    setCurrentUnit({ id: 0, idLevel, title: "", description: "", order: 0 });
    setIsCreate(true);
    setIsEdit(false);
  };

  return (
    <div className={style.container}>
      <div>
        <p>Unidades del Nivel "{titleLevel}"</p>
        {unities.length > 0 ? (
          <table className={style.table}>
            <thead className={style.thead}>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Orden</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className={style.tbody}>
              {unities
                .sort((a, b) => a.order - b.order)
                .map((unit) => (
                  <tr key={unit.id}>
                    <td>{unit.title}</td>
                    <td>{unit.description}</td>
                    <td>{unit.order}</td>
                    <td>
                      <button onClick={() => handleEditClick(unit)}>
                        Editar
                      </button>
                      <button>Eliminar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No hay unidades disponibles</p>
        )}
      </div>
      <div>
        <button onClick={handleCreateClick}>Crear unidad</button>
      </div>
      {isEdit || isCreate ? renderForm() : null}
    </div>
  );
};

export default Unities;
