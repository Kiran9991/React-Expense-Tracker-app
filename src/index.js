import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./components/store/auth-context";
import { ExpenseContextProvider } from "./components/store/expense-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ExpenseContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </ExpenseContextProvider>
);
