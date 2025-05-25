import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import HorasLibres from "./pages/HorasLibres";
import EventosDisponibles from "./pages/EventosDisponibles";
import EventosRegistrados from "./pages/EventosRegistrados";
import FormularioUsuario from "./pages/FormularioUsuario";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta de Login - Sin Layout y sin protección */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas principales con Layout y protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Inicio />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/perfil" element={
            <ProtectedRoute>
              <Layout>
                <Perfil />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/horas-libres" element={
            <ProtectedRoute>
              <Layout>
                <HorasLibres />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/eventos-disponibles" element={
            <ProtectedRoute>
              <Layout>
                <EventosDisponibles />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/eventos-registrados" element={
            <ProtectedRoute>
              <Layout>
                <EventosRegistrados />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/crear-usuario" element={
            <ProtectedRoute>
              <Layout>
                <FormularioUsuario />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
