import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { NEW_ARRIVALS_LIST } from "./assets/data/index.js";
import { ProductList } from "@components/ProductList.jsx";

export function App() {
  return <ProductList data={NEW_ARRIVALS_LIST} />;
}

const container = document.getElementById("root");
if (container) {
  if (!window.__reactRoot) {
    window.__reactRoot = ReactDOM.createRoot(container);
  }
  window.__reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
