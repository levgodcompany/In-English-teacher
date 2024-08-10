import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import styles from "./Navigation.module.css";
import { useDispatch } from "react-redux";
import { removePages } from "../../redux/slices/Navigations.slice";
import { useEffect } from "react";
const Navigation = () => {
  const history = useAppSelector((state) => state.navigation.pages);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(()=>{

  }, [history])

  const handleOnClink = (url: string, index: number, title: string) => {
    dispatch(
      removePages({index})
    )
    console.log(url, index, title)
    navigate(`${url}`, { replace: true });
  };
  return (
    <div className={styles.contianer_navegation}>
      <nav className={styles.container_nav}>
        {history.map((page, index) => (
          <span className={styles.history} key={index}>
            {index > 0 && <span>{`>`}</span>}
            <p
              className={styles.history_title}
              onClick={() => handleOnClink(page.url, page.index, page.title)}
            >
              {page.completTitle != "" ? page.completTitle : page.title}
            </p>
          </span>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
