import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound.utility";
import { PrivateRoutes } from "../../routes/routes";


const Home = lazy(() => import("./Dashboard/Dashboard"));
const Levels = lazy(() => import("./Levels/Levels"));


function Private() {
  return (
    <RoutesWithNotFound>
      <Route index element={<Navigate to={`${PrivateRoutes.DASHBOARD}`} />} />
      <Route path={`${PrivateRoutes.DASHBOARD}`} element={<Home />} />
      <Route path={`${PrivateRoutes.LEVELS}`} element={<Levels />} />

    </RoutesWithNotFound>
  );
}
export default Private;
