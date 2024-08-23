import React, { useEffect, useState } from "react";
import LevelsService from "../../../../services/Levels.service";
import style from "./Suscription.module.css";
import { LevelSuscription } from "./Suscription.types";
import NewSuscription from "../../../NewSuscription/NewSuscription";
import NewSuscriptionServices from "../../../NewSuscription/services/NewSuscription.service";
import { SuscriptionEditDto } from "../../../../types/Suscription.types";

interface SuscriptionProps {
  idLevel: number;
}

const Suscription: React.FC<SuscriptionProps> = ({ idLevel }) => {
  const [levels, setLevels] = useState<LevelSuscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedLevel, setEditedLevel] = useState<LevelSuscription | null>(null);
  const [newSus, setNewSus] = useState<boolean>(false);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const service = LevelsService.crud();
        service.setUrl(`/relation/suscription/${idLevel}`);
        const response = await service.findAll<LevelSuscription[]>();
        setLevels(response);
      } catch (err) {
        setError("Failed to fetch levels");
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, [idLevel]);

  const handleEditClick = (level: LevelSuscription) => {
    setEditingId(level.id);
    setEditedLevel({ ...level });
  };

  const handleDeleteClick = async (id: number) => {
    try {
      const service = NewSuscriptionServices.crud();
      await service.delete(id);

      setEditingId(null);
      setEditedLevel(null);
    } catch (err) {
      setError("Failed to save changes");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedLevel(null);
  };

  const handleSaveEdit = async () => {
    if (!editedLevel) return;

    try {
      const service = NewSuscriptionServices.crud();
      await service.update<number, SuscriptionEditDto>(editedLevel.id, {
        idLevel: editedLevel.idLevel,
        title: editedLevel.title,
        description: editedLevel.description,
        amount: Number(editedLevel.amount),
        discountPercentage: Number(editedLevel.discountPercentage),
        numInstallments: Number(editedLevel.numInstallments),
      });

      setLevels((prevLevels) =>
        prevLevels.map((level) =>
          level.id === editingId ? editedLevel : level
        )
      );
      setEditingId(null);
      setEditedLevel(null);
    } catch (err) {
      setError("Failed to save changes");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editedLevel) return;

    const { name, value } = e.target;
    setEditedLevel({
      ...editedLevel,
      [name]: value,
    });
  };

  if (loading) {
    return <p className={style.loadingMessage}>Loading...</p>;
  }

  if (error) {
    return <p className={style.errorMessage}>{error}</p>;
  }

  return (
    <div>
      <div className={style.container}>
        {levels.map((level) => (
          <div key={level.id} className={style.levelCard}>
            {editingId === level.id ? (
              <div>
                <label htmlFor="">
                  Titulo
                  <input
                    type="text"
                    name="title"
                    value={editedLevel?.title || ""}
                    onChange={handleChange}
                    className={style.input}
                  />
                </label>

                <label htmlFor="">
                  Descripcion
                  <textarea
                    name="description"
                    value={editedLevel?.description || ""}
                    onChange={handleChange}
                    className={style.textarea}
                  />
                </label>

                <label htmlFor="">
                  Precio
                  <input
                    type="text"
                    name="amount"
                    value={editedLevel?.amount || ""}
                    onChange={handleChange}
                    className={style.input}
                  />
                </label>

                <label htmlFor="">
                  Numero de Cuotas
                  <input
                    type="text"
                    name="numInstallments"
                    value={editedLevel?.numInstallments || ""}
                    onChange={handleChange}
                    className={style.input}
                  />
                </label>

                <label htmlFor="">
                  Porcentaje de descuento
                  <input
                    type="text"
                    name="discountPercentage"
                    value={editedLevel?.discountPercentage || ""}
                    onChange={handleChange}
                    className={style.input}
                  />
                </label>

                <button onClick={handleSaveEdit} className={style.saveButton}>
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className={style.cancelButton}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h2 className={style.levelTitle}>{level.title}</h2>
                <p className={style.levelDescription}>{level.description}</p>
                <p className={style.levelAmount}>
                  Price: ${level.amount}
                  {level.discountPercentage > 0 && (
                    <span className={style.discount}>
                      ({level.discountPercentage}% off)
                    </span>
                  )}
                </p>
                <h3 className={style.subTitle}>Benefits:</h3>
                <ul className={style.list}>
                  {level.benefits.map((benefit) => (
                    <li key={benefit.id} className={style.listItem}>
                      {benefit.description}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleEditClick(level)}
                  className={style.editButton}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteClick(level.id)}
                  className={style.editButton}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setNewSus(!newSus)}>Agregar nuevo Plan</button>
        {!newSus ? (
          <></>
        ) : (
          <>
            <NewSuscription onComplete={() => {}} />
          </>
        )}
      </div>
    </div>
  );
};

export default Suscription;
