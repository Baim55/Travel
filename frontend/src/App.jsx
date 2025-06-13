import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Destination from "./pages/Destination";
import Stay from "./pages/Stay";
import Activities from "./pages/Activities";
import AR from "./pages/AR";
import TripPlanner from "./pages/TripPlanner";
import Contact from "./pages/Contact";
import Wishlist from "./pages/wishlist/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/destinations",
        element: <Destination />,
      },
      {
        path: "/stay",
        element: <Stay />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/ar",
        element: <AR />,
      },
      {
        path: "/plan",
        element: <TripPlanner />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
