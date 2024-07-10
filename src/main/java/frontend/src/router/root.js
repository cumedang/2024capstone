import { Suspense, lazy } from "react";
import { setCookie, getCookie, removeCookie } from "../utils/cookie";
import { useState, useEffect } from "react";
import axios from "axios";
const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));
const Search = lazy(() => import("../pages/SearchPage"));
const BookReports = lazy(() => import("../pages/BookReportsPage"));
const ChatRooms = lazy(() => import("../pages/ChatPage"));
const ReadTheBook = lazy(() => import("../pages/ReadPage"));
const Report = lazy(() => import("../pages/ReportPage"));
const Join = lazy(() => import("../components/Chat/Join"));
const Shop = lazy(() => import("../pages/PointShopPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "/search",
    element: (
      <Suspense fallback={Loading}>
        <Search />
      </Suspense>
    ),
  },
  {
    path: `/search/:id/BookReports`,
    element: (
      <Suspense fallback={Loading}>
        <BookReports />
      </Suspense>
    ),
  },
  {
    path: `/chatrooms`,
    element: (
      <Suspense fallback={Loading}>
        <ChatRooms />
      </Suspense>
    ),
  },
  {
    path: `/Read/:id`,
    element: (
      <Suspense fallback={Loading}>
        <ReadTheBook />
      </Suspense>
    ),
  },
  {
    path: `/BookReport/:id`,
    element: (
      <Suspense fallback={Loading}>
        <Report />
      </Suspense>
    ),
  },
  {
    path: `/join`,
    element: (
      <Suspense fallback={Loading}>
        <Join />
      </Suspense>
    ),
  },
  {
    path: `/shop`,
    element: (
      <Suspense fallback={Loading}>
        <Shop />
      </Suspense>
    ),
  },
]);

export default root;
