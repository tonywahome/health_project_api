import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement); // Create a root
  root.render(<App />); // Render the App component
}
