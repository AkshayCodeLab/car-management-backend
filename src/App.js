import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login.js";
import Home from "./Components/Home.js";
import "./App.css";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
