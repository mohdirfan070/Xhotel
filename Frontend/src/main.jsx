import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Rooms from "./pages/Rooms.jsx";
import Bookings from './pages/Bookings.jsx'
import Checkout from './pages/Checkout.jsx'
import AddData from "./pages/AddData.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/rooms",
    element:<Rooms/>,
  },{
    path: "/bookings",
    element:<Bookings/>,
  },{
    path: "/checkout",
    element:<Checkout/>,
  },
  {
    path:'/addroom',
    element:<AddData/>
  }
   
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <RouterProvider router={router} />
 
);
