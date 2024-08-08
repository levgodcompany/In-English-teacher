import styles from "./MessageConfirm.module.css";

interface ConfirProps {
  title: string;
  message: string;
  cancel: () => void;
  accept: ()=> void;
}

const MessageConfirm: React.FC<ConfirProps> = ({ accept, cancel, message, title }) => {
  const onClickAccept = async () => {
    accept();
    cancel();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div onClick={cancel} className={styles.roomType}>
          X
        </div>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.body}>
          <p className={styles.not}>{message}</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.buttons_acept} onClick={onClickAccept}>
            Aceptar
          </button>
          <button className={styles.buttons_cancel} onClick={cancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageConfirm;
