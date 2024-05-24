import { useContext } from "react";
import { AuthContext } from "../atoms/AuthProvider";
import { Navigate } from "react-router-dom";

const ListPage = () => {
  const { authState } = useContext(AuthContext);

  console.log(authState);

  if (!authState.isAuthed) {
    return <Navigate to="/login" replace={true} />;
  }

  return <div>List Page</div>;
};

export default ListPage;
