import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";

import "./index.css";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile.tsx";
import store from "./store/Store.tsx";
import AllTasksComponent from "./components/Tasks/AllTasksComponent.tsx";
import TodayTasks from "./components/Tasks/TodayTasks.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<TodayTasks />} />
            <Route path="all" element={<AllTasksComponent />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
