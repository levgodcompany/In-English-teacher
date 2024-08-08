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

  const [selectLevel, setSelectLevel] = useState<number>(0);

  useEffect(() => {
    const http = async () => {
      try {
        const result = await LevelsService.crud().findAll();
        setLevels(result);
      } catch (error) {
        setError(`${error}`);
      }
    };
    http();
  }, []);

  const handleOnClickNewLevel = ()=> {
    setNewLevel(!newLevel)
  }

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
          levels
            .sort((a, b) => a.order - b.order)
            .map((level) => (
              <div key={level.id} className={style.container_level}>
                <div className={style.container_level_info}>
                  <span className={style.title}>{level.title}</span>
                  <p className={style.description}>{level.description}</p>
                  <p className={style.order}>{level.order}</p>
                </div>
                <div className={style.container_level_button}>
                  <button className={style.button}>Eliminar</button>
                  <button className={style.button}>Editar</button>
                  <button onClick={()=> setSelectLevel(level.id)} className={style.button}>Unidades</button>
                </div>
              </div>
            ))
        ) : (
          <></>
        )}
        <div>
          <button className={style.button} onClick={handleOnClickNewLevel}>
            Agregar Nivel
          </button>
        </div>
      </div>
      {newLevel ? (
        <div className={style.container_new_level}>
          <Wizard close={handleOnClickNewLevel} />
        </div>
      ) : (
        <></>
      )}

      <div className={style.container_unities}>
        {
          selectLevel > 0 ? <Unities idLevel={selectLevel} titleLevel="A2" /> :  <></>
        }
      </div>
    </div>
  );
};

export default Levels;
