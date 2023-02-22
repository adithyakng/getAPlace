import axios from "axios";

import AppRouter from "./AppRouter";
import "./App.css";
import { RouterProvider } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "access_token"
)}`;

function App() {
  return (
    <div className="App">
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
