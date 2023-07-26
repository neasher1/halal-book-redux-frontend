import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Products from '@/pages/Products';
import Checkout from '@/pages/Checkout';
import Signup from '@/pages/Signup';
import ProductDetails from '@/pages/ProductDetails';
import PrivateRoute from './PrivateRoutes';
import HomePages from '@/pages/Home/Home/HomePages';
import AddBooks from '@/pages/Dashboard/AddBooks';
import EditBook from '@/pages/Home/Home/EditBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePages></HomePages>,
      },
      {
        path: '/add-books',
        element: (
          <PrivateRoute>
            <AddBooks />
          </PrivateRoute>
        ),
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails />,
      },
      {
        path: '/edit-book/:id',
        element: <EditBook></EditBook>,
      },
      {
        path: '/checkout',
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
