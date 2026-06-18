// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public pages
import LandingPage from "./pages/LandingPage";
import LanguageSelect from "./pages/LanguageSelect";
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboards
import CitizenDashboard from "./pages/CitizenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AiChatAssistant from "./pages/AiChatAssistant.jsx";
import ElectricityPortal from "./pages/ElectricityPortal";
import WaterPortal from "./pages/WaterPortal";
import RoadIssues from "./pages/RoadIssues";
import ComplaintForm from "./pages/ComplaintForm";
import ComplaintStatus from "./pages/ComplaintStatus";
import NoticeBoard from "./pages/NoticeBoard";

// Admin feature pages
import AdminComplaints from "./pages/AdminComplaints";
import AdminElectricity from "./pages/AdminElectricity";
import AdminWater from "./pages/AdminWater";
import AdminRoad from "./pages/AdminRoad";
import AdminBilling from "./pages/AdminBilling";
import AdminNotices from "./pages/AdminNotices";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/language" element={<LanguageSelect />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Citizen Dashboard */}
        <Route
          path="/citizen-dashboard"
          element={
            <ProtectedRoute>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Citizen Actions */}
        <Route
          path="/electricity"
          element={
            <ProtectedRoute>
              <ElectricityPortal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/water"
          element={
            <ProtectedRoute>
              <WaterPortal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/road"
          element={
            <ProtectedRoute>
              <RoadIssues />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaint"
          element={
            <ProtectedRoute>
              <ComplaintForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <ComplaintStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notices"
          element={
            <ProtectedRoute>
              <NoticeBoard />
            </ProtectedRoute>
          }
        />

        {/* Admin Functional Tools */}
        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute adminOnly>
              <AdminComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/electricity"
          element={
            <ProtectedRoute adminOnly>
              <AdminElectricity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/water"
          element={
            <ProtectedRoute adminOnly>
              <AdminWater />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/road"
          element={
            <ProtectedRoute adminOnly>
              <AdminRoad />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/billing"
          element={
            <ProtectedRoute adminOnly>
              <AdminBilling />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/notices"
          element={
            <ProtectedRoute adminOnly>
              <AdminNotices />
            </ProtectedRoute>
          }
        />

        {/* AI Assistant — available to citizens AND admins */}
        <Route
          path="/admin/ai-assistant"
          element={
            <ProtectedRoute>
              <AiChatAssistant />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}