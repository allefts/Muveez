import styled from "styled-components";
import { useUser } from "../utils/helpers/serverFetcher";
// import EditForm from "../components/Profile/EditForm";
// import { useState } from "react";

const StyledProfilePage = styled.section`
  height: 50vh;

  div {
    margin-top: 5rem;
    padding: 0 2rem;

    display: grid;
    place-items: center;
  }
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
  const { user } = useUser();
  // const [username, setUsername] = useState(user?.username);

  // const handleUpdateUsername = () => {
  //   //Send Request to update username
  //   console.log(username);
  // };

  return (
    <StyledProfilePage>
      <StyledUserInfo>
        <img src={user?.avatar_url} alt="Profile" />
        <h3>{user?.email}</h3>
        {/* <h3>{user?.created_at}</h3> */}
      </StyledUserInfo>
      {/* <EditForm>
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleUpdateUsername();
            }
          }}
        />
      </EditForm> */}
    </StyledProfilePage>
  );
};

export default ProfilePage;
