import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminRegister from "./admin/Register/Register";
import AdminLogin from "./admin/Login/Login";
import Product from "./admin/Product/Product";
import Cart from "./admin/Cart/Cart";
import Orders from "./components/Orders/Orders";
import Payment from "./admin/Payment/Payment";
import Home from "./admin/Home/Home";
import User from "./user/UserView/User";
import Protected from "./admin/Protected/Protected";
import UserHome from "./user/UserView/User";
import UserRegister from "./user/Register/Register";
import UserLogin from "./user/Login/Login";
import Details from "./components/Details/Details";
import Profile from "./admin/Profile/Profile";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserHome/>,
      children:[
  
      ]
    },
    {
      path: "user-register",
      element: <UserRegister />,
    },
    {
      path: "user-login",
      element: <UserLogin />,
    },
    {
      path:"details/:itemId",
      element:<Details/>
    },
    {
      path:"/orders",
      element:<Orders/>
    },
    {
      path: "/admin",
      element: <Protected/>,
      children: [
        {
          path: "product",
          element: <Product />,
        },
        {
          path: "home",
          element:<Home/> 
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "payment",
          element: <Payment />,
        },
        {
          path: "users",
          element:<User/>
        },
        {
          path: "profile",
          element:<Profile/>
        },
      ],
    },
    {
      path: "admin-register",
      element: <AdminRegister />,
    },
    {
      path: "admin-login",
      element: <AdminLogin />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
