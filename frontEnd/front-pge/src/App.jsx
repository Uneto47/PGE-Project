import { Route, Routes, useLocation } from "react-router-dom";
import { pages } from "./data/pages";
import { lazy, Suspense, useEffect } from "react";
import Loading from "./components/Loading";
import LoginUsuario from "./Pages/LoginUsuario";
import PaginaInicialUsuario from "./Pages/PaginaInicialUsuario";
import CadastroUsuario from "./Pages/CadastroUsuario";
import CadastrosProcessos from "./Pages/CadastrosProcessos";
import PaginaUsuario from "./Pages/PaginaUsuario";
import CadastroDocumentos from "./Pages/CadastroDocumentos";

const routes = pages.map(e => {
  const Page = lazy(() => import(`./Pages/${e.filename}.jsx`));
  return <Route key={e.name} path={e.route} element={<Page />} />;
});

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
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<PaginaInicialUsuario />}/>
          <Route path="/cadastro" element={<CadastroUsuario />}/>
          <Route path="/cadastro-processos" element={<CadastrosProcessos />}/>
          <Route path="/cadastro/:id" element={<PaginaUsuario />}/>
          <Route path="/login" element={<LoginUsuario />}/>
          <Route path="/login/:id" element={<PaginaUsuario />} />
          <Route path="/cadastro-documentos" element={<CadastroDocumentos />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
