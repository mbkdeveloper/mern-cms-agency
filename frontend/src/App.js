import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./components/web/landing";
import Login from "./components/web/login/login";
import HeaderManager from "./components/Admin//pages/HeaderManager";
import ServicesManager from "./components/Admin/pages/ServicesManager";
import AdminLayout from "./components/Admin/layouts/AdminLayout";
import Profile from "./components/Admin/pages/Profile";
import PrivateRoute from "./components/Admin/PrivateRoute";
import GalerieManager from './components/Admin/pages/GalerieManager';
import TestimonialsManager from "./components/Admin/pages/TestimonialsManager";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Protected admin routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/header" element={<HeaderManager />} />
              <Route path="/admin/profile/me" element={<Profile />} />
              <Route path="/admin/services" element={<ServicesManager />} />
              <Route path="/admin/galerie" element={<GalerieManager />} />
              <Route path="/admin/testimonials" element={<TestimonialsManager />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
