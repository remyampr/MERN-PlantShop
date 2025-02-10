import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./Redux/store.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./component/Home.jsx";
import CategoryPage from "./component/CategoryPage.jsx";
import ErrorPage from "./component/ErrorPage.jsx";
import { Provider } from "react-redux";
import CartPage from "./component/CartPage.jsx";
import ProductDetails from "./component/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/category/:category", element: <CategoryPage /> },
      { path: "/product-details/:productId", element: <ProductDetails /> },

      { path: "/cart", element: <CartPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
