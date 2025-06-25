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

// La registrazione del service worker avviene dopo che il DOM è stato caricato completamente
window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("Service worker registrato"))
      .catch(() =>
        console.error("Errore nella registrazione del service worker")
      );
  }
});
