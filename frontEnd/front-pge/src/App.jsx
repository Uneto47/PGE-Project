import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Loading from "./components/Loading";
import LoginUsuario from "./Pages/LoginUsuario";
import PaginaInicialUsuario from "./Pages/PaginaInicialUsuario";
import CadastroUsuario from "./Pages/CadastroUsuario";
import CadastrosProcessos from "./Pages/CadastrosProcessos";
import PaginaUsuario from "./Pages/PaginaUsuario";
import CadastroDocumentos from "./Pages/CadastroDocumentos";
import Cabecalho from "./components/Cabecalho";


function App() {
  const location = useLocation();

  useEffect(() => {
    let agent = navigator.userAgent;
    if (agent.match(/firefox|fxios/i)) {
      window.scrollTo(0, 0);
    }
    else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-200">
      <Cabecalho/>
        <Routes>
          <Route path="/" element={<PaginaInicialUsuario />}/>
          <Route path="/cadastro" element={<CadastroUsuario />}/>
          <Route path="/cadastro-processos" element={<CadastrosProcessos />}/>
          <Route path="/cadastro/:id" element={<PaginaUsuario />}/>
          <Route path="/login" element={<LoginUsuario />}/>
          <Route path="/login/:id" element={<PaginaUsuario />} />
          <Route path="/cadastro-documentos" element={<CadastroDocumentos />} />
        </Routes>
    </div>
  )
}

export default App
