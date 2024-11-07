import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Rejister from "./Components/Rejister/Rejister";
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { UserContextProvider } from "./Context/UserContext";
import Productdetail from "./Components/Productdetail/Productdetail";
import ScrollTopContextProvider from "./Context/ScrollTopContext";
import CartContextProvider from "./Context/CartContext";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Components/Cart/Cart";
import CartDetails from "./Components/CartDetails/CartDetails";
import EmptyCart from "./Components/EmptyCart/EmptyCart";
import NotFound from "./Components/NotFound/NotFound";
import About from "./Components/About/About";
import User from "./Components/User/User";
import Contact from "./Components/Contact/Contact";
import WishList from "./Components/WishList.jsx/WishList";
import WishListContextProvider from "./Context/WishListContext";
import EmptyWishlist from "./Components/EmptyWishList/EmptyWishList";
import ForgetPass from "./Components/ForgetPass/ForgetPass";
import RestCode from "./Components/RestCode/RestCode";
import ChangePass from "./Components/ChangePass/ChangePass";
import UpdatePass from "./Components/UpdatePass/UpdatePass";
import Brands from "./Components/Brands/Brands";
import EditProfile from "./Components/EditProfile/EditProfile";
import CheckOut from "./Components/CheckOut/CheckOut";

function App() {

  let x = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        { path: "", element: <Home /> },
        { path: "productdetail/:id/:category", element: <ProtectedRoute><Productdetail/> </ProtectedRoute>},
        { path: "cart", element: <ProtectedRoute><Cart/> </ProtectedRoute>},
        { path: "wishList", element: <ProtectedRoute><WishList/> </ProtectedRoute>},
        { path: "cartDetails/:id", element: <ProtectedRoute><CartDetails/> </ProtectedRoute>},
        { path: "emptyCart", element: <ProtectedRoute><EmptyCart/> </ProtectedRoute>},
        { path: "emptyWishList", element: <ProtectedRoute><EmptyWishlist/> </ProtectedRoute>},
        { path: "updatePass", element: <ProtectedRoute><UpdatePass/> </ProtectedRoute>},
        { path: "brands", element: <ProtectedRoute><Brands/> </ProtectedRoute>},
        { path: "editProfile", element: <ProtectedRoute><EditProfile/> </ProtectedRoute>},
        { path: "checkOut", element: <ProtectedRoute><CheckOut/> </ProtectedRoute>},
        { path: "user", element: <User/>},
        { path: "login", element: <Login /> },
        { path: "rejister", element: <Rejister /> },
        { path: "forgetpass", element: <ForgetPass /> },
        { path: "restCode", element: <RestCode /> },
        { path: "changePass", element: <ChangePass /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "*", element: <NotFound /> }
      ],
    },
  ]);

  return (
    <WishListContextProvider>
<CartContextProvider>
       <ScrollTopContextProvider>
    <UserContextProvider>
      <RouterProvider router={x}></RouterProvider>
    </UserContextProvider>
    </ScrollTopContextProvider>
    </CartContextProvider>
    </WishListContextProvider>
    
  );
}

export default App;
