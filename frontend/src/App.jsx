import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentPage";
import ResourcesPage from "./pages/ResourcePage";
import HealthPage from "./pages/HealthPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, Arial, sans-serif" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}