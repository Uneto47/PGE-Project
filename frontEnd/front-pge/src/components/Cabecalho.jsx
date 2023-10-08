import logo from "../assets/logo.jpg";
import { useNavigate, useLocation } from "react-router-dom";

function Cabecalho() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const handleNavigate = async () => {
    navigate(-1);
  };

  return (
    <div className="px-4 lg:px-12 bg-blue-900">
      <div className="flex justify-between items-center">
        <img src={logo} alt="Logo PGE" className="h-12 lg:h-28" />
        {!isHomePage && (
          <button
            onClick={handleNavigate}
            className="flex justify-center text-lg lg:text-xl rounded-md bg-green-500 p-2 lg:p-3 font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-50"
          >
            Voltar
          </button>
        )}
      </div>
    </div>
  );
}

export default Cabecalho;
