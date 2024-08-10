import { useState } from "react";
import style from "./NewLevel.module.css"
import { levelCreateDto } from "../../types/Levels.types";
import MessageError from "../../../../../components/ConfirCancelReservation/MessageError";

interface NewLevelProps {
  onNext: () => void;
  close: ()=> void
}

const NewLevel: React.FC<NewLevelProps> = ({onNext, close})=> {
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

    const handleNumberChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // await LevelsService.crud().create<levelCreateDto>(formData)
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
        <h1 className={style.title}>Crear Nuevo Nivel</h1>
        {error && (
          <MessageError
            title="Error"
            message={error}
            cancel={() => setError(null)}
          />
        )}
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              className={style.form_input}
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              name="description"
              className={style.form_textarea}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="order">Orden *</label>
            <input
              type="number"
              id="order"
              name="order"
              className={style.form_input}
              value={formData.order}
              onChange={handleNumberChange}
              required
            />
          </div>
          <div className={style.container_buttons}>
            <button onClick={()=> close()} className={style.submitButton}>Cerrar</button>
            <button type="submit" className={style.submitButton}>Crear</button>
          </div>
        </form>
      </div>
    );
  };

export default NewLevel