import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { levelDto } from "./types/Levels.types";
import LevelsService from "./services/Levels.service";
import MessageError from "../../../components/ConfirCancelReservation/MessageError";
import style from "./Levels.module.css";
import Wizard from "./components/Wizard/Wizard";
import Unities from "./components/Unities/Unities";

const Levels = () => {
  const [levels, setLevels] = useState<levelDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newLevel, setNewLevel] = useState<boolean>(false);
  const [selectLevel, setSelectLevel] = useState<{title: string, idLevel: number} | null >(null);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const result = await LevelsService.crud().findAll();
        setLevels(result);
      } catch (error) {
        setError(`${error}`);
      }
    };
    fetchLevels();
  }, []);

  const handleOnClickNewLevel = () => {
    setNewLevel(!newLevel);
  };

  return (
    <div className={style.container}>
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
                      <button className={style.button}>Eliminar</button>
                      <button className={style.button}>Editar</button>
                      <button
                        onClick={() => setSelectLevel({
                          idLevel: level.id,
                          title: level.title
                        })}
                        className={style.button}
                      >
                        Unidades
                      </button>
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

      {selectLevel && (
        <div className={style.container_unities}>
          <Unities idLevel={selectLevel.idLevel} titleLevel={selectLevel.title} />
        </div>
      )}
    </div>
  );
};

export default Levels;
