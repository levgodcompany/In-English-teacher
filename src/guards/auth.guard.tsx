import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "../redux/hooks";
import { PrivateRoutes, PublicRoutes } from "../routes/routes";

interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = (
  <Navigate replace to={PrivateRoutes.PRIVATE} />
);

export const AuthGuard = ({ privateValidation }: Props) => {
  // const userState = useAppSelector((store) => store.token);
  const bool = true;
  return bool ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
  // return userState.token ? (
  //   privateValidation ? (
  //     PrivateValidationFragment
  //   ) : (
  //     PublicValidationFragment
  //   )
  // ) : (
  //   <Navigate replace to={PublicRoutes.LOGIN} />
  // );
};

export default AuthGuard;
