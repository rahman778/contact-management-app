import { createBrowserRouter } from "react-router-dom";
import ContactPage from "../pages/ContactPage.jsx";

const router = createBrowserRouter([
   {
      path: "/",
      element: <ContactPage />,
   }
]);

export default router;
