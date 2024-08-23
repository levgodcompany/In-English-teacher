import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes/routes";
import { useAppSelector } from "../redux/hooks";

interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = (
  <Navigate replace to={PrivateRoutes.PRIVATE} />
);

export const AuthGuard = ({ privateValidation }: Props) => {
  const userState = useAppSelector((store) => store.auth);

  return userState.token || undefined ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
};

export default AuthGuard;
