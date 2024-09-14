import { useEffect, useState } from "react";
import UnitiesService from "./services/Unities.service";
import style from "./Unities.module.css";
import { Unit, UnitCreate } from "./types/Unities.types";
import MessageError from "../../../components/ConfirCancelReservation/MessageError";
import MessageConfirm from "../../../components/Messages/MessageConfirm/MessageConfirm";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRoutes } from "../../../routes/routes";
import { useDispatch } from "react-redux";
import {
  addPage,
  updatePage,
  updatePageAll,
} from "../../../redux/slices/Navigations.slice";
import Navigation from "../../../components/Navigation/Navigation";

const Unities = () => {
  const [unities, setUnities] = useState<Unit[]>([]);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { idLevel, titleLevel } = useParams<{
    idLevel: string;
    titleLevel: string;
  }>();
  const [param, setParam] = useState<{ idLevel: number; titleLevel: string }>({
    idLevel: 0,
    titleLevel: "",
  });
  const [currentUnit, setCurrentUnit] = useState<Unit>({
    id: 0,
    idLevel: 0,
    title: "",
    description: "",
    order: 0,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUnities();
    setParam((prev) => {
      if (idLevel) {
        prev.idLevel = Number(idLevel);
      }
      if (titleLevel) {
        prev.titleLevel = titleLevel;
      }
      return prev;
    });
  }, [idLevel]);

  useEffect(() => {
    dispatch(
      updatePageAll({
        page: {},
        title: `Unidades`,
        completTitle: "",
      })
    );
  }, []);

  const fetchUnities = async () => {
    try {
      const app = UnitiesService.crud();
      app.setUrl(`/level/${idLevel}`);
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
      await app.create<UnitCreate>({
        idLevel: param.idLevel,
        description: currentUnit.description,
        order: currentUnit.order,
        title: currentUnit.title,
      });
      setCurrentUnit({
        id: 0,
        idLevel: param.idLevel,
        title: "",
        description: "",
        order: 0,
      });
      setIsCreate(false);
      fetchUnities();
    } catch (error) {
      console.error("Error creating unit:", error);
      setError(`${error}`);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const app = UnitiesService.crud();
      await app.update(currentUnit.id, currentUnit);
      setCurrentUnit({
        id: 0,
        idLevel: param.idLevel,
        title: "",
        description: "",
        order: 0,
      });
      setIsEdit(false);
      fetchUnities();
    } catch (error) {
      console.error("Error updating unit:", error);
      setError(`${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      const app = UnitiesService.crud();
      await app.delete(currentUnit.id);
      setIsDelete(false);
      setIsCreate(false);
      setIsEdit(false);
      fetchUnities();
    } catch (error) {
      console.error("Error deleting unit:", error);
      setError(`${error}`);
    }
  };

  const onDelete = (unit: Unit) => {
    setCurrentUnit(unit);
    setIsDelete(true);
  };

  const cancelDelete = () => {
    setIsDelete(false);
    setCurrentUnit({
      id: 0,
      idLevel: param.idLevel,
      title: "",
      description: "",
      order: 0,
    });
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
    setCurrentUnit({
      id: 0,
      idLevel: param.idLevel,
      title: "",
      description: "",
      order: 0,
    });
    setIsCreate(true);
    setIsEdit(false);
  };

  const next = (unit: Unit) => {
    const url = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.COURSES}/${unit.id}/${unit.title}`;
    dispatch(
      updatePage({
        prevTitle: `Unidades`,
        newTitle: `Unidad: ${unit.title}`,
      })
    );
    dispatch(
      addPage({
        title: `Cursos`,
        description: "",
        url,
      })
    );
    navigate(url, { replace: true });
  };

  return (
    <div className={style.container}>
      <Navigation />
      {error && (
        <MessageError
          title="Error"
          message={error}
          cancel={() => setError(null)}
        />
      )}
      {isDelete && (
        <MessageConfirm
          title={`Eliminar Unidad`}
          message={`Estas por eliminar la unidad "${currentUnit.title}"`}
          accept={handleDelete}
          cancel={cancelDelete}
        />
      )}
      <div>
        <p>Unidades del Nivel "{titleLevel}"</p>
        <div className={style.card_container}>
          {unities.length > 0 ? (
            unities
              .sort((a, b) => a.order - b.order)
              .map((unit) => (
                <div className={style.card} key={unit.id}>
                  <h2>{unit.title}</h2>
                  <p>{unit.description}</p>
                  <p>Orden: {unit.order}</p>
                  <div className={style.card_actions}>
                    <button onClick={() => handleEditClick(unit)}>
                      Editar
                    </button>
                    <button onClick={() => onDelete(unit)}>Eliminar</button>
                    <button onClick={() => next(unit)}>Cursos</button>
                  </div>
                </div>
              ))
          ) : (
            <p>No hay unidades disponibles</p>
          )}
        </div>
      </div>
      <div>
        <button onClick={handleCreateClick}>Crear unidad</button>
      </div>
      {(isEdit || isCreate) && !isDelete ? renderForm() : null}
    </div>
  );
};

export default Unities;
