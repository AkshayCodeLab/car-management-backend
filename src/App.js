import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login.js";
import Home from "./Components/Home.js";
import Product from "./Components/Product.js";
import "./App.css";
import store from "./Utils/store.js";
import { Provider } from "react-redux";

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
    {
      path: "/products/:id",
      element: <Product />,
    },
  ]);
  return (
    <Provider store={store}>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
};

export default App;
