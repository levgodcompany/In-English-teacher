import React, { useEffect, useState } from "react";
import { ClassOnliveDTO } from "../../types/Assign.type";
import styles from "./ClassOnlive.module.css";
import ClassOnliveService from "./services/ClassOnlive.service";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ClassOnliveProps {
  classOnliveAssign: ClassOnliveDTO[] | undefined;
  idCohort: number;
}

const ClassOnlive: React.FC<ClassOnliveProps> = ({
  classOnliveAssign,
  idCohort,
}) => {
  const [classes, setClasses] = useState<ClassOnliveDTO[]>(
    classOnliveAssign || []
  );
  const [editClass, setEditClass] = useState<ClassOnliveDTO | null>(null);
  const [newClass, setNewClass] = useState<ClassOnliveDTO>({
    id: 0,
    title: "",
    url: "",
    description: "",
  });

  useEffect(() => {
    if (classOnliveAssign) {
      setClasses(classOnliveAssign);
    }
  }, [classOnliveAssign]);

  const handleDelete = async (id: number) => {
    setClasses(classes.filter((cl) => cl.id !== id));
    const app = ClassOnliveService.crud();
    await app.delete(id);
  };

  const handleEdit = (cl: ClassOnliveDTO) => {
    setEditClass(cl);
  };

  const handleSave = async () => {
    const app = ClassOnliveService.crud();
    if (editClass) {
      setClasses(
        classes.map((cl) => (cl.id === editClass.id ? editClass : cl))
      );
      setEditClass(null);
      await app.update(editClass.id, editClass);
    } else {
      await app.create({
        idCohort: idCohort,
        title: newClass.title,
        url: newClass.url,
        description: "",
      });
      setClasses([...classes, { ...newClass, id: Date.now() }]);
      setNewClass({ id: 0, title: "", url: "", description: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit: boolean
  ) => {
    const { name, value } = e.target;
    if (isEdit && editClass) {
      setEditClass({ ...editClass, [name]: value });
    } else {
      setNewClass({ ...newClass, [name]: value });
    }
  };

  const handleChangeDescription = (value: string, isEdit: boolean) => {
    if (isEdit && editClass) {
      setEditClass({ ...editClass, description: value });
    } else {
      setNewClass({ ...newClass, description: value });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Clases en vivo</h2>

      {classes.length > 0 ? (
        <div className={styles.classesContainer}>
          {classes.map((cl) => (
            <div key={cl.id} className={styles.classCard}>
              <div className={styles.classHeader}>
                <h3 className={styles.classTitle}>{cl.title}</h3>
                <p className={styles.classUrl}>
                  {cl.url.length > 0 ? cl.url : "N/A"}
                </p>
              </div>
              <div
                className={styles.classDescription}
                dangerouslySetInnerHTML={{ __html: cl.description }}
              ></div>
              <div className={styles.classActions}>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(cl.id)}
                >
                  Eliminar
                </button>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(cl)}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noClassesMessage}>
          No hay clases en vivo asignadas.
        </p>
      )}

      {/* Formulario para agregar/editar clases */}
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>
          {editClass ? "Editar Clase" : "Agregar Nueva Clase"}
        </h3>
        <input
          className={styles.input}
          type="text"
          name="title"
          value={editClass ? editClass.title : newClass.title}
          onChange={(e) => handleChange(e, Boolean(editClass))}
          placeholder="Título de la clase"
        />
        <input
          className={styles.input}
          type="text"
          name="url"
          value={editClass ? editClass.url : newClass.url}
          onChange={(e) => handleChange(e, Boolean(editClass))}
          placeholder="URL de la clase"
        />
        <label className={styles.label} htmlFor="description">
          Descripción
        </label>
        <ReactQuill
          className={styles.textEditor}
          value={editClass ? editClass.description : newClass.description}
          onChange={(e) => handleChangeDescription(e, Boolean(editClass))}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ align: [] }],
              ["link"],
              ["blockquote", "code-block", "formula"],
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "indent",
            "align",
            "link",
            "blockquote",
            "code-block",
            "formula",
          ]}
        />
        <button className={styles.saveButton} onClick={handleSave}>
          {editClass ? "Guardar Cambios" : "Agregar Clase"}
        </button>
      </div>
    </div>
  );
};

export default ClassOnlive;
