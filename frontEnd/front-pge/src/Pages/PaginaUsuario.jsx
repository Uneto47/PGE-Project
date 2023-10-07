import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Documentos from "../components/documentos/Documentos";

const BASE_URL = "http://localhost:3000";

function PaginaUsuario() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [usuarioData, setUsuarioData] = useState(null);
  const [processoData, setProcessoData] = useState([]);
  const [envolvido, setEnvolvido] = useState([]);
  const location = useLocation();
  const [error, setError] = useState(null);
  const tipoRecebido = location.state.tipo;

  const handleDeleteProcesso = (processoId) => {
    console.log(processoId)
    
    axios.delete(`${BASE_URL}/processos-judiciais/delete/${processoId}`).then(() => {
      console.log("Processo deletado com sucesso!")  
      window.location.reload();
    })
      .catch((error) => {
        console.log("Erro ao excluir o processo. Por favor, tente novamente mais tarde.")
      });
  };

  useEffect(() => {
    if (tipoRecebido === "cliente") {
      axios.get(`${BASE_URL}/cliente/${id}`).then((usuarioResponse) => {

        setUsuarioData(usuarioResponse.data);

        axios.get(`${BASE_URL}/processos-judiciais/processo/cliente/${usuarioResponse.data.cpf}`).then((processoResponse) => {

          setProcessoData(processoResponse.data);

          for (let i = 0; i < processoResponse.data.length; i++) {
            axios.get(`${BASE_URL}/advogado/cpf/${processoResponse.data[i].responsavel}`).then((envolvidoResponse) => {
              setEnvolvido((prevState) => [...prevState, envolvidoResponse.data.nome]);
            })
          }
          setLoading(false);
        })
      })
      
    }
    else if (tipoRecebido === "advogado") {
      axios.get(`${BASE_URL}/advogado/${id}`).then((usuarioResponse) => {

        setUsuarioData(usuarioResponse.data);
        setUsuarioData(usuarioResponse.data);

        axios.get(`${BASE_URL}/processos-judiciais/processo/advogado/${usuarioResponse.data.cpf}`).then((processoResponse) => {
          setProcessoData(processoResponse.data);
          
          console.log(processoResponse.data);
          for (let i = 0; i < processoResponse.data.length; i++) {
            axios.get(`${BASE_URL}/cliente/cpf/${processoResponse.data[i].parte}`).then((envolvidoResponse) => {
              setEnvolvido((prevState) => [...prevState, envolvidoResponse.data.nome])
            })
          }
          setLoading(false);
        })
      })
    }
  }, []);

  return (
    <div className="p-8 bg-slate-200 min-h-screen">
      {loading ? (
        <p className="text-center text-xl font-semibold mb-4">Carregando dados...</p>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-2 ">
            <h1 className="text-3xl font-semibold bg-blue-800 text-white font-semibold p-4 rounded-full ">Dados do {tipoRecebido}:</h1>
            <div>
              <Link to="/cadastro-processos" className="pr-2">
                <button
                  className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Cadastre um Novo Processo
                </button>
              </Link>
              <Link to="/cadastro-documentos">
                <button
                  className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Cadastre um Novo Documento
                </button>
              </Link>
            </div>
          </div>
          <p className="mb-2"><strong>Nome:</strong> {usuarioData.nome}</p>
          <p className="mb-2"><strong>CPF:</strong> {usuarioData.cpf}</p>
          
          
          {processoData && processoData.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
            {processoData.map((processo, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow relative">
                
                <h2 className="text-xl font-semibold mb-2">
                  Dados do processo número:<strong> {processo.numeroprocesso} </strong>
                </h2>
                <p>
                <strong>{tipoRecebido === "advogado" ? "Cliente" : "Advogado"}:</strong> {envolvido[index]}
                </p>
                <strong> <Documentos processoData={processo} /></strong>
                <p><strong>Tema:</strong> {processo.tema}</p>
                <p><strong>Valor da Causa:</strong> {processo.valorcausa}</p>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold mt-2 mr-2 2py-1 px-2 rounded-full absolute top-2 right-2 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleDeleteProcesso(processo.numeroprocesso)}
                  >
                    Excluir
                  </button>
              </div>
            ))}
            </div>
          ) : (
            <p className="text-center text-xl font-semibold">Ainda não existem processos relacionados a este usuário</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PaginaUsuario;