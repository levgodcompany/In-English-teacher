import { useEffect, useState, useCallback } from "react";
import { levelDto } from "../../../../types/Levels.types";
import LevelsService from "../../../../services/Levels.service";
import style from "./Level.module.css";

interface LevelProps {
  idLevel: number;
}

const Level: React.FC<LevelProps> = ({ idLevel }) => {
  const [level, setLevel] = useState<levelDto | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchLevel = useCallback(async () => {
    try {
      const service = LevelsService.crud();
      const res = await service.findOne<levelDto, string>(`/${idLevel}`);
      setLevel(res);
    } catch (error) {
      console.error("Error fetching level:", error);
    }
  }, [idLevel]);

  useEffect(() => {
    fetchLevel();
  }, [fetchLevel]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLevel((prevLevel) =>
      prevLevel ? { ...prevLevel, [e.target.name]: e.target.value } : prevLevel
    );
  };

  const handleSave = async () => {
    if (!level) return;
    try {
      const service = LevelsService.crud();
      await service.update<string, levelDto>(`${idLevel}`, level);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating level:", error);
    }
  };

  const renderEdit = () => {
    return (
      <div>
        {level ? (
          <>
            <input
              type="text"
              name="title"
              value={level.title}
              onChange={handleInputChange}
              className={style.levelInput}
            />
            <input
              type="number"
              name="order"
              value={level.order}
              onChange={handleInputChange}
              className={style.levelInput}
            />

            <textarea
              name="description"
              value={level.description}
              onChange={handleInputChange}
              className={style.levelTextarea}
            />
            <button onClick={handleSave} className={style.saveButton}>
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={style.cancelButton}
            >
              Cancelar
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };

  const renderLevel = () => {
    return (
      <div>
        {level ? (
          <>
            <div className={style.levelHeader}>
              <h2 className={style.levelTitle}>{level.title}</h2>
              <span className={style.levelOrder}>Order: {level.order}</span>
            </div>
            <p className={style.levelDescription}>{level.description}</p>

            <div>
              <button
                onClick={() => setIsEditing(true)}
                className={style.editButton}
              >
                Edit
              </button>
            </div>
          </>
        ) : (
          <p className={style.loadingMessage}>Loading level...</p>
        )}
      </div>
    );
  };

  return <div className={style.containerLevel}>
    {
        !isEditing ? renderLevel() : renderEdit()
    }
  </div>;
};

export default Level;
