import { useEffect, useState } from "react";
import ModulesService from "./services/Modules.service";
import style from "./Modules.module.css";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import PdfViewer from "./components/PdfViewer/PdfViewer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Module, ModuleCreate } from "../types/Modules.types";
import MessageError from "../../../components/ConfirCancelReservation/MessageError";
import MessageConfirm from "../../../components/Messages/MessageConfirm/MessageConfirm";
import { useParams } from "react-router-dom";
import Navigation from "../../../components/Navigation/Navigation";
import { useDispatch } from "react-redux";
import {
  addPage,
  updatePageAll,
} from "../../../redux/slices/Navigations.slice";
import { PrivateRoutes } from "../../../routes/routes";

const Modules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [module, setModule] = useState<Module | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { idCourse, titleCourse } = useParams<{
    idCourse: string;
    titleCourse: string;
  }>();
  const [param, setParam] = useState<{ idCourse: number; titleCourse: string }>(
    {
      idCourse: 0,
      titleCourse: "",
    }
  );
  const [currentModule, setCurrentModule] = useState<Module>({
    id: 0,
    idCourse: 0,
    title: "",
    description: "",
    order: 0,
    fileURL: "",
    typeFile: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchModules();
    setParam((prev) => {
      if (idCourse) {
        prev.idCourse = Number(idCourse);
      }
      if (titleCourse) {
        prev.titleCourse = titleCourse;
      }

      return prev;
    });
  }, [idCourse]);

  useEffect(() => {
    dispatch(
      updatePageAll({
        page: {},
        title: `Modulos`,
        completTitle: "",
      })
    );
  }, []);

  const fetchModules = async () => {
    try {
      const app = ModulesService.crud();
      app.setUrl(`/course/${idCourse}`);
      const res = await app.findAll();
      setModules(res);
    } catch (error) {
      console.error("Error fetching modules:", error);
      setError(`${error}`);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const app = ModulesService.crud();
      await app.create<ModuleCreate>({
        description: currentModule.description,
        fileURL: currentModule.fileURL,
        idCourse: currentModule.idCourse,
        order: currentModule.order,
        title: currentModule.title,
        typeFile: currentModule.typeFile,
      });
      setCurrentModule({
        id: 0,
        idCourse: param.idCourse,
        title: "",
        description: "",
        order: 0,
        fileURL: "",
        typeFile: "",
      });
      setIsCreate(false);
      fetchModules(); // Refresca la lista de módulos
    } catch (error) {
      console.error("Error creating module:", error);
      setError(`${error}`);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const app = ModulesService.crud();
      await app.update(currentModule.id, currentModule);
      setCurrentModule({
        id: 0,
        idCourse: param.idCourse,
        title: "",
        description: "",
        order: 0,
        fileURL: "",
        typeFile: "",
      });
      setIsEdit(false);
      fetchModules(); // Refresca la lista de módulos
    } catch (error) {
      console.error("Error updating module:", error);
      setError(`${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      const app = ModulesService.crud();
      app.setUrl("");
      await app.delete(currentModule.id);
      setIsDelete(false);
      setIsCreate(false);
      setIsEdit(false);
      fetchModules(); // Refresca la lista de módulos
    } catch (error) {
      console.error("Error deleting module:", error);
      setError(`${error}`);
    }
  };

  const onDelete = (module: Module) => {
    setCurrentModule(module);
    setIsDelete(true);
  };

  const cancelDelete = () => {
    setIsDelete(false);
    setCurrentModule({
      id: 0,
      idCourse: param.idCourse,
      title: "",
      description: "",
      order: 0,
      fileURL: "",
      typeFile: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentModule((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeDescription = (value: string) => {
    setCurrentModule((prev) => ({ ...prev, description: value }));
  };

  const renderForm = () => (
    <div className={style.container_new}>
      <p className={style.container_new_title}>
        {isEdit ? "Editar Módulo" : "Crear Módulo"}
      </p>
      <form
        className={style.form}
        onSubmit={isEdit ? handleEdit : handleCreate}
      >
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="title">
            Título *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={style.form_input}
            value={currentModule.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="description">
            Descripción
          </label>
          <ReactQuill
            className={style.form_input}
            value={currentModule.description}
            onChange={handleChangeDescription}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="order">
            Orden *
          </label>
          <input
            type="number"
            id="order"
            name="order"
            className={style.form_input}
            value={currentModule.order}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="fileURL">
            URL del Archivo
          </label>
          <input
            type="text"
            id="fileURL"
            name="fileURL"
            className={style.form_input}
            value={currentModule.fileURL || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="typeFile">
            Tipo de Archivo
          </label>
          <input
            type="text"
            id="typeFile"
            name="typeFile"
            className={style.form_input}
            value={currentModule.typeFile || ""}
            onChange={handleInputChange}
          />
        </div>
        <button className={style.form_button} type="submit">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );

  const handleEditClick = (module: Module) => {
    setCurrentModule(module);
    setIsEdit(true);
    setIsCreate(false);
  };

  const handleCreateClick = () => {
    setCurrentModule({
      id: 0,
      idCourse: param.idCourse,
      title: "",
      description: "",
      order: 0,
      fileURL: "",
      typeFile: "",
    });
    setIsCreate(true);
    setIsEdit(false);
  };

  const handleSelectModule = (module: Module) => {
    setModule(module);
  };

  const viewTeacher = () => {
    return (
      <>
        <div>
          <p>Módulos del Curso "{titleCourse}"</p>
          {modules.length > 0 ? (
            <table className={style.table}>
              <thead className={style.thead}>
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Orden</th>
                  <th>URL del Archivo</th>
                  <th>Tipo de Archivo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className={style.tbody}>
                {modules
                  .sort((a, b) => a.order - b.order)
                  .map((module) => (
                    <tr key={module.id}>
                      <td>{module.title}</td>
                      <td>{module.description}</td>
                      <td>{module.order}</td>
                      <td>{module.fileURL || "N/A"}</td>
                      <td>{module.typeFile || "N/A"}</td>
                      <td>
                        <button onClick={() => handleEditClick(module)}>
                          Editar
                        </button>
                        <button onClick={() => onDelete(module)}>
                          Eliminar
                        </button>
                        <button onClick={() => handleSelectModule(module)}>
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No hay módulos disponibles</p>
          )}
        </div>
        <div>
          <button onClick={handleCreateClick}>Crear módulo</button>
        </div>
        {(isEdit || isCreate) && !isDelete ? renderForm() : null}

        {module && module.fileURL && module.typeFile == "video" ? (
          <VideoPlayer url={module.fileURL} />
        ) : (
          <></>
        )}

        {module && module.fileURL && module.typeFile == "pdf" ? (
          <PdfViewer url={module.fileURL} />
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <div className={style.container}>
      <Navigation />
      {error && (
        <MessageError
          title="Error"
          message={error}
          cancel={() => setError(null)}
        />
      )}
      {isDelete && (
        <MessageConfirm
          title={`Eliminar Módulo`}
          message={`Estas por eliminar el módulo "${currentModule.title}"`}
          accept={handleDelete}
          cancel={cancelDelete}
        />
      )}
      <div className={style.container_view}>{viewTeacher()}</div>
    </div>
  );
};

export default Modules;
