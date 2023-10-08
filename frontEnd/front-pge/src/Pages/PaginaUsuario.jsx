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
    console.log(processoId);

    axios
      .delete(`${BASE_URL}/processos-judiciais/delete/${processoId}`)
      .then(() => {
        console.log("Processo deletado com sucesso!");
        window.location.reload();
      })
      .catch((error) => {
        console.log(
          "Erro ao excluir o processo. Por favor, tente novamente mais tarde."
        );
      });
  };

  useEffect(() => {
    if (tipoRecebido === "cliente") {
      axios.get(`${BASE_URL}/cliente/${id}`).then((usuarioResponse) => {
        setUsuarioData(usuarioResponse.data);

        axios
          .get(
            `${BASE_URL}/processos-judiciais/processo/cliente/${usuarioResponse.data.cpf}`
          )
          .then((processoResponse) => {
            setProcessoData(processoResponse.data);

            for (let i = 0; i < processoResponse.data.length; i++) {
              axios
                .get(
                  `${BASE_URL}/advogado/cpf/${processoResponse.data[i].responsavel}`
                )
                .then((envolvidoResponse) => {
                  setEnvolvido((prevState) => [
                    ...prevState,
                    envolvidoResponse.data.nome,
                  ]);
                });
            }
            setLoading(false);
          });
      });
    } else if (tipoRecebido === "advogado") {
      axios.get(`${BASE_URL}/advogado/${id}`).then((usuarioResponse) => {
        setUsuarioData(usuarioResponse.data);
        setUsuarioData(usuarioResponse.data);

        axios
          .get(
            `${BASE_URL}/processos-judiciais/processo/advogado/${usuarioResponse.data.cpf}`
          )
          .then((processoResponse) => {
            setProcessoData(processoResponse.data);

            console.log(processoResponse.data);
            for (let i = 0; i < processoResponse.data.length; i++) {
              axios
                .get(
                  `${BASE_URL}/cliente/cpf/${processoResponse.data[i].parte}`
                )
                .then((envolvidoResponse) => {
                  setEnvolvido((prevState) => [
                    ...prevState,
                    envolvidoResponse.data.nome,
                  ]);
                });
            }
            setLoading(false);
          });
      });
    }
  }, []);

  return (
    <div className="p-8 bg-slate-200 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <span> Carregando...</span>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-2 items-center mb-5">
            <div className="font-semibold bg-blue-800 text-white w-full max-w-xs font-semibold p-4 rounded-lg mb-3 sm:mb-0">
              <h1 className="text-2xl text-center">Dados do {tipoRecebido}</h1>
              <p className="text-lg mt-1"> Nome: {usuarioData.nome} </p>
              <p className="text-lg mt-1"> CPF: {usuarioData.cpf} </p> 
                {tipoRecebido === "advogado" && (<p className="text-lg">OAB: {usuarioData.oab}</p>)}
            </div>
            <div className="flex flex-row gap-2">
              <Link to="/cadastro-processos">
                <button className="rounded bg-blue-800 w-full max-w-sm px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-white ">
                  Novo Processo
                </button>
              </Link>
              <Link to="/cadastro-documentos">
                <button className="rounded bg-blue-800 w-full max-w-sm px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-white">
                  Novo Documento
                </button>
              </Link>
            </div>
          </div>
          {processoData && processoData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {processoData.map((processo, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow relative flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Dados do processo número: <strong>{processo.numeroprocesso}</strong>
                    </h2>
                    <p>
                      <strong> {tipoRecebido === "advogado" ? "Cliente" : "Advogado"}: </strong> {envolvido[index]}
                    </p>
                    <div className="overflow-y-auto max-h-32">
                      <Documentos processoData={processo} />
                    </div>
                    <p> <strong>Tema:</strong> {processo.tema} </p>
                    <p> <strong>Valor da Causa:</strong> {processo.valorcausa} </p>
                  </div>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold mt-2 2py-1 px-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 self-end"
                    onClick={() => handleDeleteProcesso(processo.numeroprocesso)}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl font-semibold">
              Ainda não existem processos relacionados a este usuário
            </p>
          )}

        </div>
      )}
    </div>
  );
}

export default PaginaUsuario;
