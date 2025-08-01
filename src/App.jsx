import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from './Layouts/MainLayout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import AutContextProvider from './contexts/autContext';
import CounterContextProvider from './contexts/counterContext';
import { ThemeProvider } from './contexts/themeContext';
import Cart from './pages/Cart/Cart';
import Categories from './pages/Categories/Categories';
import Brands from './pages/Brands/Brands';
import ProtctedRoute from './ProtctedRoute/ProtctedRoute';
import ProtctedAuthRoute from './ProtctedRoute/ProtctedAuthRoute';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import Address from "./pages/Address/Address";
import Orders from "./pages/Orders/Orders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import WhishList from "./pages/WhishList/WhishList";

const queryclient = new QueryClient();



function App() {

  const router = createBrowserRouter([
    {path:'',element:<MainLayout/>,children:[
      {index:true,element:<ProtctedRoute><Home/></ProtctedRoute>},
      {path:'login',element:<ProtctedAuthRoute><Login/></ProtctedAuthRoute>},
      {path:'register',element:<ProtctedAuthRoute><Register/></ProtctedAuthRoute>},
      {path:'cart',element:<ProtctedRoute><Cart/></ProtctedRoute>},
      {path:'categories',element:<ProtctedRoute><Categories/></ProtctedRoute>},
      {path:'brands',element:<ProtctedRoute><Brands/></ProtctedRoute>},
      {path:'allorders',element:<ProtctedRoute><Orders/></ProtctedRoute>},
      {path:'address/:cartId',element:<ProtctedRoute><Address/></ProtctedRoute>},
      {path:'whishlist',element:<ProtctedRoute><WhishList/></ProtctedRoute>},
      {path:'productDetails/:id',element:<ProtctedRoute><ProductDetails/></ProtctedRoute>},
      {path:'*',element:<NotFound/>}
    ]}
  ])

  return (
    <>

    <Provider store={store}>
      <QueryClientProvider client={queryclient} >
        <ThemeProvider>
          <AutContextProvider>
            <CounterContextProvider>
              <RouterProvider router={router}/>
              <ToastContainer/>
            </CounterContextProvider>
          </AutContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
    
    
    </>
  )
}

export default App
