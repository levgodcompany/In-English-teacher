import { useState } from "react";
import style from "./NewLevel.module.css"
import { levelCreateDto } from "../../types/Levels.types";
import LevelsService from "../../services/Levels.service";
import MessageError from "../../../../../components/ConfirCancelReservation/MessageError";

interface NewLevelProps {
  onNext: () => void;
}

const NewLevel: React.FC<NewLevelProps> = ({onNext})=> {
    const [formData, setFormData] = useState<levelCreateDto>({
      description: "",
      order: 0,
      title: ""
    });
  
    const [error, setError] = useState<string | null>(null);
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // await LevelsService.createLevel(formData);
        setFormData({
          description: "",
          order: 0,
          title: ""
        });
        onNext()
      } catch (error) {
        setError(`${error}`);
      }
    };
  
    return (
      <div className={style.container}>
        <h1>Crear Nuevo Nivel</h1>
        {error && (
          <MessageError
            title="Error"
            message={error}
            cancel={() => setError(null)}
          />
        )}
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="order">Orden *</label>
            <input
              type="text"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={style.submitButton}>Crear</button>
        </form>
      </div>
    );
  };

export default NewLevel