import { BrowserRouter, Route, Routes } from "react-router";
import LayoutMain from "./pages/layout-main";
import PageComponents from "./pages/page-components";
import PageSolicitacoes from "./pages/page-solicitacoes";
import PageNewRefund from "./pages/page-new-refund";
import PageRefundDetails from "./pages/page-refund-details";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

export default function App() {
  return (
    <NuqsAdapter>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutMain />}>
            <Route index element={<PageSolicitacoes />} />
            <Route path="novo" element={<PageNewRefund />} />
            <Route path="reembolso/:id" element={<PageRefundDetails />} />
            <Route path="componentes" element={<PageComponents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NuqsAdapter>
  );
}
