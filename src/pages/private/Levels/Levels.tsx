import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { levelDto } from "./types/Levels.types";
import LevelsService from "./services/Levels.service";
import MessageError from "../../../components/ConfirCancelReservation/MessageError";
import style from "./Levels.module.css";
import Wizard from "./components/Wizard/Wizard";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes/routes";
import Navigation from "../../../components/Navigation/Navigation";
import { useDispatch } from "react-redux";
import {
  addPage,
  clearNavigation,
  updatePage,
} from "../../../redux/slices/Navigations.slice";
import Exam from "./components/Exam/Exam";
import imgEdit from "../../../assets/edit-3-svgrepo-com.svg";
import imgDelete from "../../../assets/delete-2-svgrepo-com.svg";
import imgExam from "../../../assets/i-exam-multiple-choice-svgrepo-com.svg";
import imgUnit from "../../../assets/unit-svgrepo-com.svg";
import EditLevel from "./components/EditLevel/EditLevel";

const Levels = () => {
  const [levels, setLevels] = useState<levelDto[]>([]);
  const [levelSelect, setLevelSelect] = useState<levelDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newLevel, setNewLevel] = useState<boolean>(false);
  const [editLevel, setEditLevel] = useState<number | null>(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchLevels();
    dispatch(clearNavigation());
    dispatch(
      addPage({
        title: `Niveles`, // Título de la página
        description: "", // Descripción de la página
        url: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.LEVELS}`,
      })
    );
  }, []);

  const fetchLevels = async () => {
    try {
      const result = await LevelsService.crud().findAll();
      setLevels(result);
    } catch (error) {
      setError(`${error}`);
    }
  };

  const fetchLevelsDelete = async (id: number) => {
    try {
      await LevelsService.crud().delete(id);
      await fetchLevels();
      // setLevels(result);
    } catch (error) {
      setError(`${error}`);
    }
  };

  const handleOnClickNewLevel = () => {
    setNewLevel(!newLevel);
  };

  const next = (level: levelDto) => {
    const url = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.UNITIES}/${level.id}/${level.title}`;
    dispatch(
      updatePage({
        prevTitle: `Niveles`,
        newTitle: `Nivel: ${level.title}`,
      })
    );
    dispatch(
      addPage({
        title: `Unidades`, // Título de la página
        description: "", // Descripción de la página
        url,
      })
    );
    navigate(url, { replace: true });
  };

  return (
    <div className={style.container}>
      <div className={style.container_nav}>
        <Navigation />
      </div>
      <Sidebar />

      <h1>Niveles</h1>

      {error && (
        <MessageError
          title="Error"
          message={error}
          cancel={() => setError(null)}
        />
      )}

      <div className={style.container_levels}>
        {levels.length > 0 ? (
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
              {levels
                .sort((a, b) => a.order - b.order)
                .map((level) => (
                  <tr key={level.id}>
                    <td>{level.title}</td>
                    <td>{level.description}</td>
                    <td>{level.order}</td>
                    <td>
                      <img
                        style={{ width: "15px" }}
                        onClick={() => fetchLevelsDelete(level.id)}
                        className={style.button}
                        src={imgDelete}
                        alt="Eliminar"
                      />
                      <img
                        style={{ width: "15px" }}
                        onClick={() => setEditLevel(level.id)}
                        className={style.button}
                        src={imgEdit}
                        alt="Editar"
                      />

                      <img
                        style={{ width: "15px" }}
                        onClick={() => setLevelSelect(level)}
                        className={style.button}
                        src={imgExam}
                        alt="Exams"
                      />

                      <img
                        style={{ width: "15px" }}
                        onClick={() => next(level)}
                        className={style.button}
                        src={imgUnit}
                        alt="Unites"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No hay niveles disponibles</p>
        )}
        <div>
          <button className={style.button} onClick={handleOnClickNewLevel}>
            Agregar Nivel
          </button>
        </div>
      </div>

      {newLevel && (
        <div className={style.container_new_level}>
          <Wizard close={handleOnClickNewLevel} />
        </div>
      )}
      {levelSelect ? (
        <>
          <Exam idLevel={levelSelect.id} />
        </>
      ) : (
        <></>
      )}

      {
        editLevel ? <EditLevel idLevel={editLevel} /> : <></>
      }
    </div>
  );
};

export default Levels;
