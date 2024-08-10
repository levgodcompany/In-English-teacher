import React from "react";
import styles from "./CourseList.module.css";
import { CourseAndModules } from "../../../../types/Courses.types";
import { Module } from "../../../../types/Modules.types";

type CourseListProps = {
  course: CourseAndModules;
  setModuleSelet: (moduleSelect: {
    url: string,
    title: string,
    description: string
  }) => void;
};

const CourseList: React.FC<CourseListProps> = ({ course, setModuleSelet }) => {
  const sortedModules = course.modules.sort((a, b) => a.order - b.order);

  const handleSelect = (module: Module)=> {
    if(module.typeFile && module.fileURL){
      switch (module.typeFile) {
        case 'pdf':
          // Lógica para manejar archivos PDF
          setModuleSelet({
            title: module.title,
            url: "",
            description: module.description
          })
          // Aquí podrías establecer un estado o realizar otra acción específica para PDFs
          break;
          
        case 'video':
          // Lógica para manejar archivos de video
          setModuleSelet({
            title: module.title,
            url: module.fileURL ? module.fileURL : "",
            description: module.description
          })
          // Aquí podrías establecer un estado o realizar otra acción específica para videos
          break;
          
        case 'link':
          // Lógica para manejar enlaces
          console.log('Handling link');
          // Aquí podrías establecer un estado o realizar otra acción específica para enlaces
          break;
          
        default:
          console.log('Unknown file type');
          // Manejo para tipos de archivo desconocidos
          break;
      }
    }
   
  }


  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        <span className={styles.courseTitle}>{course.title}</span>
      </div>
      <ul className={styles.moduleList}>
        {sortedModules
          .sort((a, b) => a.order - b.order)
          .map((module) => (
            <li onClick={()=> handleSelect(module)} key={module.id} className={styles.moduleItem}>
              <div className={styles.moduleInfo}>
                <p className={styles.title}>{module.title}</p>
                {/* <span className={styles.typeFile}>Type: {module.typeFile}</span> */}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CourseList;
