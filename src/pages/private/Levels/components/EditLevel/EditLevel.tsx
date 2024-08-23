import style from "./EditLevel.module.css";
import Level from "./components/Level/Level";
import Suscription from "./components/Suscription/Suscription";

interface EditLevelProps {
  idLevel: number;
}
const EditLevel: React.FC<EditLevelProps> = ({ idLevel }) => {
  return (
    <div className={style.container}>
      <div>
        <p>Nivel</p>
        <Level idLevel={idLevel} />
      </div>
      <div>
        <p>Planes</p>
        <Suscription idLevel={idLevel} />
      </div>
    </div>
  );
};

export default EditLevel;
