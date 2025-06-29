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
import TourDetail from "./pages/TourDetail/TourDetail";
import ForgotPassword from "./pages/auth/forgotpassword/ForgotPassword";
import Resetpassword from "./pages/auth/resetpassword/Resetpassword";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/userSlice";
import axios from "axios";
import RequireAdmin from "./components/auth/RequireAdmin";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import AdminTours from "./pages/admin/adminTours/AdminTours";
import AdminUsers from "./pages/admin/adminUsers/AdminUsers";
import NewTour from "./pages/admin/newTour/NewTour";
import EditTour from "./pages/admin/editTour/EditTour";
import Basket from "./pages/basket/Basket";
import Tour3DView from "./pages/3D/Tour3DView";
import MyBookings from "./pages/myBookings/MyBookings";
import AdminBookings from "./pages/admin/booking/AdminBookings";
import AdminMessages from "./pages/admin/messages/AdminMessages";
import AdminComments from "./pages/admin/comments/AdminComments";

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
        path: "/mybooking",
        element: <MyBookings />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/detail/:id",
        element: <TourDetail />,
      },
      {
        path: "/detail/:id/3d-view",
        element: <Tour3DView />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/resetpassword",
        element: <Resetpassword />,
      },
      {
        path: "admin",
        element: (
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        ),
        children: [
          { index: true, element: <h2>Welcome, Admin!</h2> },
          { path: "tours", element: <AdminTours /> },
          { path: "tours/new", element: <NewTour /> },
          { path: "tours/:id/edit", element: <EditTour /> },
          { path: "users", element: <AdminUsers /> },
          { path: "bookings", element: <AdminBookings /> },
          { path: "comments", element: <AdminComments /> },
          { path: "messages", element: <AdminMessages /> },
        ],
      },
    ],
  },
]);
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:5000/auth/me", {
          withCredentials: true, // httpOnly cookie-ni göndərmək üçün
        });
        dispatch(setUser(res.data.user));
      } catch (error) {
        console.log("İstifadəçi login olmayıb");
      }
    }

    fetchUser();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
