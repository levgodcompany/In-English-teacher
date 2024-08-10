import { useEffect, useState } from "react";
import styles from "./ViewStudent.module.css";
import { Module } from "../../../types/Modules.types";

interface ViewStudentProps {
  moduls: Module[];
}
const ViewStudent: React.FC<ViewStudentProps> = ({ moduls }) => {
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [modules, setModules] = useState<Module[]>(moduls);

  useEffect(() => {
    const sortedModules = modules.sort((a, b) => a.order - b.order);
    setModules(sortedModules);
    if (moduls.length > 0) {
      handleModuleSelect(modules[0].id);
    }
  }, []);

  const handleModuleSelect = (moduleId: number) => {
    const selectedModule = modules.find((module) => module.id === moduleId);
    setCurrentModule(selectedModule || null);
  };

  if (!currentModule) {
    return <p>Selecciona un módulo para ver los detalles.</p>;
  }

  const otherModules = modules.filter(
    (module) => module.id !== currentModule.id
  );

  const otherModulesComponent = () => {
    return (
      <div className={styles.container}>
        <ul className={styles.moduleList}>
          {modules.map((module) => (
            <li key={module.id} className={styles.moduleItem}>
              <div className={styles.moduleInfo}>
                <h3 className={styles.title}>{module.title}</h3>
                {module.typeFile && (
                  <span className={styles.typeFile}>
                    Type: {module.typeFile}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return <div>{otherModulesComponent()}</div>;
};

export default ViewStudent;
