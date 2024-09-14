import React, { useState } from "react";
import { ClassOnliveDTO } from "../../types/Assign.type";
import styles from "./ClassOnlive.module.css";

interface ClassOnliveProps {
  classOnliveAssign: ClassOnliveDTO[] | undefined;
  idCohort: number;
}

const ClassOnlive: React.FC<ClassOnliveProps> = ({ classOnliveAssign }) => {
  const [classes, setClasses] = useState<ClassOnliveDTO[]>(classOnliveAssign || []);
  const [editClass, setEditClass] = useState<ClassOnliveDTO | null>(null);
  const [newClass, setNewClass] = useState<ClassOnliveDTO>({ id: 0, title: "", url: "" });

  const handleDelete = (id: number) => {
    setClasses(classes.filter((cl) => cl.id !== id));
  };

  const handleEdit = (cl: ClassOnliveDTO) => {
    setEditClass(cl);
  };

  const handleSave = () => {
    if (editClass) {
      setClasses(classes.map((cl) => (cl.id === editClass.id ? editClass : cl)));
      setEditClass(null);
    } else {
      setClasses([...classes, { ...newClass, id: Date.now() }]);
      setNewClass({ id: 0, title: "", url: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const { name, value } = e.target;
    if (isEdit && editClass) {
      setEditClass({ ...editClass, [name]: value });
    } else {
      setNewClass({ ...newClass, [name]: value });
    }
  };

  return (
    <div>
      <h2>Clases en vivo</h2>
      {classes.length > 0 ? (
        classes.map((cl) => (
          <div key={cl.id} className={styles.courseCard}>
            <h3>{cl.title}</h3>
            <p>{cl.url}</p>
            <div>
              <button onClick={() => handleDelete(cl.id)}>Eliminar</button>
              <button onClick={() => handleEdit(cl)}>Editar</button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay clases en vivo asignadas.</p>
      )}

      {/* Formulario para agregar/editar clases */}
      <div className={styles.formContainer}>
        <h3>{editClass ? "Editar Clase" : "Agregar Nueva Clase"}</h3>
        <input
          type="text"
          name="title"
          value={editClass ? editClass.title : newClass.title}
          onChange={(e) => handleChange(e, Boolean(editClass))}
          placeholder="Título de la clase"
        />
        <input
          type="text"
          name="url"
          value={editClass ? editClass.url : newClass.url}
          onChange={(e) => handleChange(e, Boolean(editClass))}
          placeholder="URL de la clase"
        />
        <button onClick={handleSave}>{editClass ? "Guardar Cambios" : "Agregar Clase"}</button>
      </div>
    </div>
  );
};

export default ClassOnlive;
