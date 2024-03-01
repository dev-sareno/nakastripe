import React from 'react';
import './App.css';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import ProductsPage from './Pages/ProductsPage/ProductsPage';
import PaymentPage from './Pages/PaymentPage/PaymentPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductsPage />,
  },
]);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="users">
          <Route path=":userId" element={<ProfilePage />} />
          <Route path="me" element={...} />
        </Route> */}
        <Route path="payment/:id" element={<PaymentPage />} />
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
