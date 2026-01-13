import ProductSlider from "~/mainpage";
// import { BrowserRouter, Routes,Route } from "react-router";
import Login from "~/login";
import Cart from "~/cart";
import ProtectedRoute from "~/protectedRoutes";


export function Welcome() {
  return (
    <div>
      <ProductSlider/>
      <Login/>
      
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
        
    </div>
  );
}

