import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./Context/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
