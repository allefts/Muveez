import Nav from "./components/Navbar/Nav";
import Page from "./pages/Page";

function App() {
  const getUser = () => {
    fetch("http://localhost:8000/user", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <>
      <Nav />
      <Page />
      <footer></footer>
      <button onClick={getUser}>Get User</button>
    </>
  );
}

export default App;
