import { RouterProvider } from "react-router-dom";
import Paging from "./components/Pasing/Pagination";
import root from "./router/root";

function App() {
  return (
    <>
      <RouterProvider router={root} />
    </>
  );
}

export default App;
