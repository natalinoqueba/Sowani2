import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserTypeProvider } from "./context/UserTypeContext";

import Landing from "./pages/landing/Landing";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import SelectRole from "./pages/common/SelectRole";
import Settings from "./pages/common/Settings";

import DashboardAgricultor from "./pages/agricultor/Dashboard";
import DashboardTransportador from "./pages/transportador/Dashboard";
import DashboardComprador from "./pages/comprador/Dashboard";


const PrivateRoute = ({ children }) => {
  return children; // RoleGuard cuidará do acesso
};

const App = () => {
  return (
    <UserTypeProvider>
      <BrowserRouter>
        <Routes>
          {/* Páginas públicas */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboards com rota de settings */}
          <Route path="/agricultor/*" element={<PrivateRoute><DashboardAgricultor /></PrivateRoute>}>
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/transportador/*" element={<PrivateRoute><DashboardTransportador /></PrivateRoute>}>
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/comprador/*" element={<PrivateRoute><DashboardComprador /></PrivateRoute>}>
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Redireciona qualquer rota desconhecida */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserTypeProvider>
  );
};

export default App;
