import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../src/app/app";
import "./shared/css/app.scss";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
