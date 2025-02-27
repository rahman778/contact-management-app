import { ToastContainer } from "react-toastify";

import router from "./router";
import "./App.css";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
