import Home from "./pages/home/Home";
import { Outlet, HashRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/Users";
import Product from "./pages/product/Products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalStorageService } from "./service/local-storage-service";
import Shops from "./pages/shops/Shops";
import Orders from "./pages/orders/Orders";
import { orderStatus } from "./model/order-status";
import { useCallback, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ADMIN_ROLES, ADMIN_UUID } from "./service/constant";
import { useDispatch, useSelector } from "react-redux";
import Categories from "./pages/categories/Categories";
import { socket } from "./service/socket";
import Discounts from "./pages/discounts/Discounts";
import NotFoundPage from "./pages/404/NotFound";
import { convertVNDCurrencyformatting } from "./utils/modifield-string";
import { RECEIVE_NEW_ORDER, receiveNewOrder } from "./redux/action/order-action";
import { logError } from "./api";
import PublishedProducts from "./pages/products/page/published/Product-published";
import DraftProdutcs from "./pages/products/page/draft/Product-draft";

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  element: React.ReactElement;
}
interface LayoutProps {
  userData?: string | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const tokenA = LocalStorageService.getTokenA();
  const tokenR = LocalStorageService.getTokenR();

  return tokenA && tokenR ? <>{element}</> : <Login />;
};

const Layout: React.FC<LayoutProps> = ({ userData }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string | undefined>();
  const isExpandedMenu = useSelector((state: any) => state.user.isExpandedMenu);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const handleOrderCreate = useCallback(async (data: any) => {
    try {
      const contentOrder = (
        <div>
          <h4>You have received a new order.</h4>
          <p>Total {convertVNDCurrencyformatting(data.order_checkout.totalPrice)}</p>
        </div>
      );
      
      // console.log("Order data:", data);
  
      toast.success(contentOrder, {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      
      dispatch(receiveNewOrder(RECEIVE_NEW_ORDER, data));
  
      setMessage(data.order_userId);
    } catch (error) {
      logError(error, 'handleOrderCreate');
    }
  }, [dispatch, setMessage]);
  
  useEffect(() => {
    
    const onSocketConnect = () => {
      console.log("Socket connection  successfully.");
      setIsSocketConnected(true);
    };
  
    socket.on("connect", onSocketConnect);
  
    return () => {
      socket.off("connect", onSocketConnect);
    };
  }, [setIsSocketConnected]);
  
  useEffect(() => {
    if (userData?.includes("SHOP") && isSocketConnected) {
      const storedRolesString = localStorage.getItem(ADMIN_UUID);
  
      socket.on(`onordercreate/${storedRolesString}`, handleOrderCreate);
  
      return () => {
        socket.off(`onordercreate/${storedRolesString}`, handleOrderCreate);
      };
    }
  }, [message, isSocketConnected, handleOrderCreate]);
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div
          className="menuContainer"
          style={{ width: isExpandedMenu ? 80 : 200 }}
        >
          <Menu />
        </div>
        <div className="contentContainer">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

function App() {
  const [userData, setUserData] = useState<string>();

  const handleFetchData = async () => {
    const storedRolesString = sessionStorage.getItem(ADMIN_ROLES);
    if (storedRolesString !== null) {
      setUserData(storedRolesString.toString());
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  // const
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/",
  //     element: (
  //       <ProtectedRoute element={<Layout userData={userData?.toString()} />} />
  //     ),
  //     children: [
  //       {
  //         path: "/home",
  //         element: <Home />,
  //       },
  //       {
  //         path: "/users",
  //         element: <Users />,
  //       },
  //       {
  //         path: "/orders",
  //         children: [
  //           {
  //             path: "pending",
  //             element: <Orders status={orderStatus.pending} />,
  //           },
  //           {
  //             path: "confirmed",
  //             element: <Orders status={orderStatus.confirmed} />,
  //           },
  //           {
  //             path: "shipping",
  //             element: <Orders status={orderStatus.shipping} />,
  //           },
  //           {
  //             path: "delivered",
  //             element: <Orders status={orderStatus.delivered} />,
  //           },
  //           {
  //             path: "canceled",
  //             element: <Orders status={orderStatus.canceled} />,
  //           },
  //         ],
  //       },
  //       {
  //         path: "/categories",
  //         element: <Categories />,
  //       },
  //       {
  //         path: "/products",
  //         element: <Products />,
  //       },
  //       {
  //         path: "/shops",
  //         element: <Shops />,
  //       },
  //       {
  //         path: "/users/:id",
  //         element: <User />,
  //       },
  //       {
  //         path: "/products/:id",
  //         element: <Product />,
  //       },
  //       {
  //         path: "/discounts",
  //         element: <Discounts />
  //       }
  //     ],
  //   },
  // ]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={<Layout userData={userData?.toString()} />}
            />
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          {userData?.includes("SHOP") && (
            <Route path="/orders">
              <Route
                path="pending"
                element={<Orders status={orderStatus.pending} />}
              />
              <Route
                path="confirmed"
                element={<Orders status={orderStatus.confirmed} />}
              />
              <Route
                path="shipping"
                element={<Orders status={orderStatus.shipping} />}
              />
              <Route
                path="delivered"
                element={<Orders status={orderStatus.delivered} />}
              />
              <Route
                path="canceled"
                element={<Orders status={orderStatus.canceled} />}
              />
            </Route>
          )}
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/published-products" element={<PublishedProducts />} />
          <Route path="/draft-products" element={<DraftProdutcs />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/discounts" element={<Discounts />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
