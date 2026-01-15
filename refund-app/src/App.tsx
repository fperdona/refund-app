import { BrowserRouter, Route, Routes } from "react-router";
import LayoutMain from "./pages/layout-main";
import PageComponents from "./pages/page-components";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<PageComponents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
