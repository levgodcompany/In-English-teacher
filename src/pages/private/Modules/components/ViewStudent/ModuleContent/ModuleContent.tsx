import React from "react";
import style from "./ModuleContent.module.css";
import VideoPlayer from "../../VideoPlayer/VideoPlayer";
import PdfViewer from "../../PdfViewer/PdfViewer";

interface Module {
  id: number;
  title: string;
  description: string;
  idCourse: number;
  order: number;
  fileURL: string | null;
  typeFile: string | null;
}

interface ModuleContentProps {
  currentModule: Module;
  otherModules: Module[];
  onModuleSelect: (moduleId: number) => void;
}

const ModuleContent: React.FC<ModuleContentProps> = ({
  currentModule,
  otherModules,
  onModuleSelect,
}) => {
  const view = () => {
    if (currentModule.fileURL && currentModule.typeFile == "video") {
      return <VideoPlayer url={currentModule.fileURL} />;
    } else if (currentModule.fileURL && currentModule.typeFile == "pdf") {
      return <PdfViewer url={currentModule.fileURL} />;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h2>{currentModule.title}</h2>
        <p>{currentModule.description}</p>
        {view()}
        {currentModule.fileURL && (
          <a
            href={currentModule.fileURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar archivo ({currentModule.typeFile})
          </a>
        )}
      </div>
      <div className={style.sidebar}>
        <h3>Otros Módulos</h3>
        <ul>
          {otherModules.map((module) => (
            <li key={module.id} onClick={() => onModuleSelect(module.id)}>
              {module.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModuleContent;
