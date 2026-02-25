import React from "react";
import ReactDOM from "react-dom/client";
import Product from "@components/Product.jsx";
import "./main.css";
import { product } from "./assets/data/index.js";

export function App() {
  return (
    <>
      <h1>Hello, React!!</h1>
      <Product
        image={product.image}
        title={product.title}
        detail={product.detail}
      />
    </>
  );
}
const root = document.getElementById("root");
if (root) {
  const rootElement = ReactDOM.createRoot(root);
  rootElement.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
