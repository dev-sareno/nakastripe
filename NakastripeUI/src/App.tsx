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
import { StripeProvider } from './Hooks/UseStripe';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductsPage />,
  },
]);

function App() {
  return (
    <StripeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="payment/:id" element={<PaymentPage />} />
          <Route path="callback/payment/success" element={<div>Payment successful!</div>} />
          <Route path="callback/payment/cancelled" element={<div>Payment cancelled!</div>} />
          <Route path="/" element={<ProductsPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </StripeProvider>
  );
}

export default App;
