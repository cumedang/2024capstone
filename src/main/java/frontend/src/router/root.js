import { Suspense, lazy } from "react";

const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));
const Search = lazy(() => import("../pages/SearchPage"))
const BookReports = lazy(() => import("../pages/BookReportsPage"))

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
  }
]);

export default root;
