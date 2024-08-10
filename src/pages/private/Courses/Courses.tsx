import { useEffect, useState } from "react";
import CoursesService from "./services/Courses.service";
import style from "./Courses.module.css";
import ViewStudent from "./components/ViewStudent/ViewStudent";
import { Course, CourseCreate } from "../types/Courses.types";
import MessageError from "../../../components/ConfirCancelReservation/MessageError";
import MessageConfirm from "../../../components/Messages/MessageConfirm/MessageConfirm";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRoutes } from "../../../routes/routes";
import Navigation from "../../../components/Navigation/Navigation";
import { useDispatch } from "react-redux";
import {
  addPage,
  updatePage,
  updatePageAll,
} from "../../../redux/slices/Navigations.slice";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [viewStudent, setViewStudent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { idUnit, titleUnit } = useParams<{
    idUnit: string;
    titleUnit: string;
  }>();
  const [param, setParam] = useState<{ idUnit: number; titleUnit: string }>({
    idUnit: 0,
    titleUnit: "",
  });
  const [currentCourse, setCurrentCourse] = useState<Course>({
    id: 0,
    idUnit: 0,
    title: "",
    description: "",
    order: 0,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCourses();
    setParam((prev) => {
      if (idUnit) {
        prev.idUnit = Number(idUnit);
      }
      if (titleUnit) {
        prev.titleUnit = titleUnit;
      }

      return prev;
    });
  }, [idUnit]);

  useEffect(() => {
    console.log("up page elim competTitle")
    dispatch(
      updatePageAll({
        page: {
        },
        title: `Cursos`,
        completTitle: ""
      })
    );
  }, []);

  const fetchCourses = async () => {
    try {
      const app = CoursesService.crud();
      app.setUrl(`/unit/${idUnit}`);
      const res = await app.findAll();
      setCourses(res);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const app = CoursesService.crud();
      await app.create<CourseCreate>({
        idUnit: param.idUnit,
        description: currentCourse.description,
        order: currentCourse.order,
        title: currentCourse.title,
      });
      setCurrentCourse({
        id: 0,
        idUnit: param.idUnit,
        title: "",
        description: "",
        order: 0,
      });
      setIsCreate(false);
      fetchCourses(); // Refresca la lista de cursos
    } catch (error) {
      console.error("Error creating course:", error);
      setError(`${error}`);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const app = CoursesService.crud();
      await app.update(currentCourse.id, currentCourse);
      setCurrentCourse({
        id: 0,
        idUnit: param.idUnit,
        title: "",
        description: "",
        order: 0,
      });
      setIsEdit(false);
      fetchCourses(); // Refresca la lista de cursos
    } catch (error) {
      console.error("Error updating course:", error);
      setError(`${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      const app = CoursesService.crud();
      app.setUrl("");
      await app.delete(currentCourse.id);
      setIsDelete(false);
      setIsCreate(false);
      setIsEdit(false);
      fetchCourses(); // Refresca la lista de cursos
    } catch (error) {
      console.error("Error deleting course:", error);
      setError(`${error}`);
    }
  };

  const onDelete = (course: Course) => {
    setCurrentCourse(course);
    setIsDelete(true);
  };

  const cancelDelete = () => {
    setIsDelete(false);
    setCurrentCourse({
      id: 0,
      idUnit: param.idUnit,
      title: "",
      description: "",
      order: 0,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentCourse((prev) => ({ ...prev, [name]: value }));
  };

  const renderForm = () => (
    <div className={style.container_new}>
      <p className={style.container_new_title}>
        {isEdit ? "Editar Curso" : "Crear Curso"}
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
            value={currentCourse.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            className={style.form_input}
            value={currentCourse.description}
            onChange={handleInputChange}
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
            value={currentCourse.order}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className={style.form_button} type="submit">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );

  const handleEditClick = (course: Course) => {
    setCurrentCourse(course);
    setIsEdit(true);
    setIsCreate(false);
  };

  const handleCreateClick = () => {
    setCurrentCourse({
      id: 0,
      idUnit: param.idUnit,
      title: "",
      description: "",
      order: 0,
    });
    setIsCreate(true);
    setIsEdit(false);
  };

  const next = (course: Course) => {
    const url = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MODULES}/${course.id}/${course.title}`;
    dispatch(
      updatePage({
        prevTitle: `Cursos`,
        newTitle: `Curso: ${course.title}`,
      })
    );
    dispatch(
      addPage({
        title: `Modulos`, // Título de la página
        description: "", // Descripción de la página
        url,
      })
    );
    navigate(url, { replace: true });
  };

  const viewTeacher = () => {
    return (
      <>
        <div>
          
          <p>Cursos de la Unidad "{titleUnit}"</p>
          {courses.length > 0 ? (
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
                {courses
                  .sort((a, b) => a.order - b.order)
                  .map((course) => (
                    <tr key={course.id}>
                      <td>{course.title}</td>
                      <td>{course.description}</td>
                      <td>{course.order}</td>
                      <td>
                        <button onClick={() => handleEditClick(course)}>
                          Editar
                        </button>
                        <button onClick={() => onDelete(course)}>
                          Eliminar
                        </button>
                        <button onClick={() => next(course)}>Modulos</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No hay cursos disponibles</p>
          )}
        </div>
        <div>
          <button onClick={handleCreateClick}>Crear curso</button>
        </div>
        {(isEdit || isCreate) && !isDelete ? renderForm() : null}
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
          title={`Eliminar Curso`}
          message={`Estás por eliminar el curso "${currentCourse.title}"`}
          accept={handleDelete}
          cancel={cancelDelete}
        />
      )}

      <div>
        <button onClick={() => setViewStudent(false)}>Vista Profesor</button>
        <button onClick={() => setViewStudent(true)}>Vista Alumno</button>
      </div>
      <div className={style.container_view}>
        {!viewStudent ? viewTeacher() : <ViewStudent idUnit={param.idUnit} />}
      </div>
    </div>
  );
};

export default Courses;
