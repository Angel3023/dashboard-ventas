import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Estilos propios
import "./styles/theme.css";
import "./styles/custom.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
