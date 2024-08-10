import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { Suspense } from "react";
import RoutesWithNotFound from './utilities/RoutesWithNotFound.utility';
import { PrivateRoutes } from './routes/routes';
import AuthGuard from './guards/auth.guard';
import Private from './pages/private/private';
import { Provider } from "react-redux";
import store from "./redux/store";


function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<h1>Cargando...</h1>}>
          <RoutesWithNotFound>

            <Route
              path="/"
              element={
                <Navigate
                  to={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.DASHBOARD}`}
                  replace
                />
              }
            />

            <Route path="singup" element={<h1>Registrarce</h1>} />
            <Route path="singin" element={<h1>Logearce</h1>} />


            <Route element={<AuthGuard privateValidation={true} />}>
              <Route
                path={`${PrivateRoutes.PRIVATE}/*`}
                element={<Private />}
              />
            </Route>

          </RoutesWithNotFound>
        </Suspense>
      </BrowserRouter>

    </Provider>
  )
}

export default App
