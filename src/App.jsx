import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import HorasLibres from "./pages/HorasLibres";
import EventosDisponibles from "./pages/EventosDisponibles";
import EventosRegistrados from "./pages/EventosRegistrados";
import FormularioUsuario from "./pages/FormularioUsuario";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/horas-libres" element={<HorasLibres />} />
          <Route path="/eventos-disponibles" element={<EventosDisponibles />} />
          <Route path="/eventos-registrados" element={<EventosRegistrados />} />
          <Route path="/crear-usuario" element={<FormularioUsuario />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
