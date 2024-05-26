import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../Context/AuthProvider";
import EditForm from "../components/Profile/EditForm";

const StyledProfilePage = styled.div`
  margin-top: 5rem;
  padding: 0 2rem;

  display: grid;
  place-items: center;
`;

const StyledUserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    border-radius: 2rem;
  }

  > * {
    margin-bottom: 1rem;
  }
`;

const ProfilePage = () => {
  const { authState } = useContext(AuthContext);

  return (
    <StyledProfilePage>
      <StyledUserInfo>
        <img src={authState.user?.avatarURL} alt="Profile" />
        <h3>{authState.user?.email}</h3>
        <h3>{authState.user?.createdAt}</h3>
      </StyledUserInfo>
      <EditForm>
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />
      </EditForm>
    </StyledProfilePage>
  );
};

export default ProfilePage;
