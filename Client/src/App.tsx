import Nav from "./components/Navbar/Nav";
import Page from "./pages/Page";
import { AuthProvider } from "./store/authContext";

function App() {
  return (
    <AuthProvider>
      <Nav />
      <Page />
      <footer></footer>
    </AuthProvider>
  );
}

export default App;
