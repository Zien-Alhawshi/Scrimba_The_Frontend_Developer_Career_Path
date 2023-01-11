import React from "react"
import Header from "./components/Header"
import Cart from "./pages/Cart"
import Photos from "./pages/Photos"
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
function App() {    
    return (
        <div>
            <Header />
            <Routes>
              <Route exact path="/" element={<Photos />} />
              <Route exact path="/cart" element={<Cart />} />
            </Routes>
        </div>
    )
}

export default App