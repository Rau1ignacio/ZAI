import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../modules/dashboard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
