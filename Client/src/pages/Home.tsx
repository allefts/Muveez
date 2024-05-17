const HomePage = () => {
  const LoginWithGoogleButton = async () => {
    window.location.href = "http://localhost:8000/auth/google/login";
    // fetch("http://localhost:8000/auth/google/login", {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => LoginWithGoogleButton()}>Login With Google</button>
    </div>
  );
};

export default HomePage;
