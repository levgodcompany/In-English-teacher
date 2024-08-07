import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { levelDto } from "./types/Levels.types";
import LevelsService from "./services/Levels.service";
import MessageError from "../../../components/ConfirCancelReservation/MessageError";
import style from "./Levels.module.css";
import NewLevel from "./components/NewLevel/NewLevel";
import NewSuscription from "./components/NewSuscription/NewSuscription";
import Wizard from "./components/Wizard/Wizard";

const Levels = () => {
  const [levels, setLevels] = useState<levelDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const http = async () => {
      try {
        const result = await LevelsService.getAllLevles();
        setLevels(result);
      } catch (error) {
        setError(`${error}`);
      }
    };
    http();
  }, []);

  return (
    <div className={style.container}>
      <Sidebar />

      <h1>Niveles</h1>
      {error ? (
        <MessageError
          title="Error"
          message={error}
          cancel={() => setError(null)}
        />
      ) : (
        <></>
      )}

      <div className={style.container_levles}>
        {levels.length > 0 ? (
          levels.map((level) => (
            <div className={style.container_level}>
              <div className={style.container_level_info}>
                <span className={style.title}>{level.title}</span>
                <p className={style.description}>{level.description}</p>
                <p className={style.order}>{level.order}</p>
              </div>
              <div className={style.container_level_button}>
                <button>Eliminar</button>
                <button>Editar</button>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>


      <div>
        <Wizard />
      </div>
    </div>
  );
};

export default Levels;
