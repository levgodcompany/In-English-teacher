import { PrivateRoutes } from '../../routes/routes';
import styles from './NotFound.module.css';
const NotFound = ()=> {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Lo sentimos, la página que estás buscando no existe.</p>
            <a href={PrivateRoutes.DASHBOARD} className={styles.homeLink}>Volver al inicio</a>
        </div>
    );
}

export default NotFound;