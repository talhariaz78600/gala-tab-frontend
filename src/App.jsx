import "./App.css";
import "./assets/css/main.css";
import { routes } from "./routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-quill/dist/quill.snow.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SocketInitializer from "./components/SocketInitializer";
import { setActiveChat, setCurrentUserId } from "./store/chatSlice";
import NotificationsSocket from "./components/NotificationsSocket";
import ThemeProvider from "./components/ThemeProvider";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handlePopState = () => {
      if (
        window.location.pathname !== "/user-inbox" ||
        window.location.pathname !== "/vendor-inbox" ||
        window.location.pathname !== "/admin-dashboard/contact-support" ||
        window.location.pathname !== "/inbox"
      ) {
        dispatch(setActiveChat(null));
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [dispatch]);

  const router = createBrowserRouter(routes);
  return (
    <>
      <ThemeProvider>
        <SocketInitializer />
        <NotificationsSocket />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
