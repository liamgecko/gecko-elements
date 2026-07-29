import { Navigate, Route, Routes } from "react-router-dom";

import { FormPages } from "./components/form-pages";
import { RegisterPage } from "./pages/register";
import { SummaryPage } from "./pages/summary";

export default function App() {
  return (
    <Routes>
      <Route element={<FormPages />}>
        <Route path="/" element={<RegisterPage />} />
      </Route>
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
