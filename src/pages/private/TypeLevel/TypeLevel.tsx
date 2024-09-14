import { useEffect, useState } from "react";
import { TypeLevelDto } from "./types/TypeLevel.types";
import TypeLevelService from "./services/TypeLevel.service";
import {
  addPage,
  clearNavigation,
} from "../../../redux/slices/Navigations.slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PrivateRoutes } from "../../../routes/routes";
import Navigation from "../../../components/Navigation/Navigation";
import styles from "./TypeLevel.module.css"; // Importamos los estilos del module.css
import Sidebar from "../../../components/Sidebar/Sidebar";

const TypeLevel = () => {
  const [typeLevels, setTypeLevels] = useState<TypeLevelDto[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTypeLevels();
    dispatch(clearNavigation());
    dispatch(
      addPage({
        title: `TypeNiveles`, // Título de la página
        description: "", // Descripción de la página
        url: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.TYPE_LEVEL}`,
      })
    );
  }, []);

  const fetchTypeLevels = async () => {
    try {
      const api = TypeLevelService.crud();
      const result = await api.findAll();
      setTypeLevels(result);
    } catch (error) {
      console.error("Error fetching type levels:", error);
    }
  };

  const next = (idTypeLevel: number) => {
    const url = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.LEVELS}/${idTypeLevel}`;
    dispatch(
      addPage({
        title: `Niveles`, // Título de la página
        description: "", // Descripción de la página
        url,
      })
    );

    navigate(url, { replace: true });
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <Sidebar />
      <h1 className={styles.title}>Tipo de Niveles</h1>
      <div className={styles.levelsContainer}>
        {typeLevels.map((tl) => (
          <div key={tl.id} className={styles.levelCard} onClick={()=> next(tl.id)}>
            <h2 className={styles.levelTitle}>{tl.title}</h2>
            <p className={styles.levelDescription}>{tl.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeLevel;
