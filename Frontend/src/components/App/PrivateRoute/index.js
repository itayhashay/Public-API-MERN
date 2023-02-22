import { Navigate } from "react-router-dom";
import { checkIfUserConnected } from "../../../utils/browser";
import RoutesUrls from "../../../utils/constants/routes";

const PrivateRoute = ({ component }) => {
  const isUserConnected = checkIfUserConnected();

  if (!isUserConnected) {
    // not logged in so redirect to login page with the return url
    return (
      <Navigate replace to={`../${RoutesUrls.USER_FORM}/${RoutesUrls.LOGIN}`} />
    );
  }

  // authorized so return child components
  return component;
};

export default PrivateRoute;
