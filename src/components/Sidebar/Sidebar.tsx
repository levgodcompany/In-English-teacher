import { useState } from "react";
import SidebarStyle from "./Sidebar.module.css";
// import ArrowRrightImg from "../../assets/arrow-sm-right-svgrepo-com.svg";
// import CloseImg from "../../assets/close-sm-svgrepo-com.svg";
import { PrivateRoutes } from "../../routes/routes";
import { useNavigate } from "react-router-dom";

interface Routes {
  route: string;
  title: string;
}

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const listRouter: Routes[] = [
    {
      route: PrivateRoutes.DASHBOARD,
      title: "Dashboard",
    },
    {
      route: PrivateRoutes.LEVELS,
      title: "Niveles",
    },
    {
      route: PrivateRoutes.STUDENTS,
      title: "Estudiantes",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const redirect = (url: string) => {
    navigate(`/${PrivateRoutes.PRIVATE}/${url}`, { replace: true });
  };

  const linsk = () => {
    return (
      <>
        {listRouter.map((r, i) => (
          <li
            key={i}
            onClick={() => redirect(r.route)}
            className={SidebarStyle.li_container}
          >
            <span>{r.title}</span>
          </li>
        ))}
      </>
    );
  };

  return (
    <>
      <div>
        <div>
          {!isSidebarOpen ? (
            <button className={SidebarStyle.toggle_btn} onClick={toggleSidebar}>
              <p>Menu</p>
              <p>{`------->`}</p>
              {/* <img src={ArrowRrightImg} alt="" width="30" height="30" /> */}
            </button>
          ) : (
            <></>
          )}
        </div>
        <div>
          {isSidebarOpen ? (
            <div className={SidebarStyle.Container_sidebar}>
              <div className={SidebarStyle.cont_title_open_sidebar}>
                <h2 className={SidebarStyle.cont_title_open_sidebar_title}>
                  Menu
                </h2>
                <button
                  className={`${SidebarStyle.toggle_btn_close}`}
                  onClick={toggleSidebar}
                >
                  <p>X</p>
                  {/* <img src={CloseImg} alt="" width="20" height="20" /> */}
                </button>
              </div>

              <div className={SidebarStyle.Container_list}>
                <nav className={SidebarStyle.nav_container}>{linsk()}</nav>
              </div>
            </div>
          ) : (
            <div
              className={`${SidebarStyle.Container} ${SidebarStyle.sidebar}`}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
