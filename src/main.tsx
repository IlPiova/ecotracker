import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.tsx";
import Profile from "./components/Profile/Profile.tsx";
import store from "./store/Store.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
