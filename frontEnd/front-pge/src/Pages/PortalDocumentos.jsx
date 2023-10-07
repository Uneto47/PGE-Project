import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Documentos from "../components/documentos/Documentos";

const BASE_URL = "http://localhost:3000";

function PortalDocumentos() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [usuarioData, setUsuarioData] = useState(null);
  const [processoData, setProcessoData] = useState([]);
  const [envolvido, setEnvolvido] = useState([]);
  const location = useLocation();
  const tipoRecebido = location.state.tipo;


  useEffect(() => {
    const fetchData = async () => {
      if (tipoRecebido === "cliente") {
        try {
          const usuarioResponse = await axios.get(`${BASE_URL}/cliente/${id}`);
          setUsuarioData(usuarioResponse.data);

          const processoResponse = await axios.get(`${BASE_URL}/processos-judiciais/processo/cliente/${usuarioResponse.data.cpf}`);
          setProcessoData(processoResponse.data);
          console.log(processoResponse.data)

          for(let i = 0; i < processoData.length; i++){
          const envolvidoResponse = await axios.get(`${BASE_URL}/advogado/cpf/${processoResponse.data[i].responsavel}`);
          setEnvolvido((prevState) => [...prevState, envolvidoResponse.data.nome]); }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else if (tipoRecebido === "advogado") {
        try {
          const usuarioResponse = await axios.get(`${BASE_URL}/advogado/${id}`);
          setUsuarioData(usuarioResponse.data);

          const processoResponse = await axios.get(`${BASE_URL}/processos-judiciais/processo/advogado/${usuarioResponse.data.cpf}`);
          console.log(processoResponse.data)
          setProcessoData(processoResponse.data);
          console.log(processoData)

          for(let i = 0; i < processoData.length; i++){
            const envolvidoResponse = await axios.get(`${BASE_URL}/cliente/cpf/${processoData.data[i].parte}`);
            setEnvolvido((prevState) => {
              console.log("att envolvidos", [...prevState, envolvidoResponse.data.nome])
              return [...prevState, envolvidoResponse.data.nome]
            }); }
        } catch (error) {
          console.error(error);
        } finally {
          
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Carregando dados...</p>
      ) : (
        <div>
          <h1>Dados do {tipoRecebido}:</h1>
          <p>Nome: {usuarioData.nome}</p>
          <p>CPF: {usuarioData.cpf}</p>
          <Link to="/cadastro-projetos">
            <button
              className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm 
            font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Teste
            </button>
          </Link>
          {processoData && processoData.length > 0 ? (
            <div>
              {processoData.map((processo, index) => (
                <div key={index}>
                  <h1>Dados do processo judicial:</h1>
                  <p>Número: {processo.numeroprocesso}</p>
                  <p>{tipoRecebido === "advogado" ? "Cliente" : "Advogado"}: {envolvido[index]}</p>
                  <Documentos processoData={processo} />
                  <p>Tema: {processo.tema}</p>
                  <p>Valor da Causa: {processo.valorcausa}</p>
                </div>
              ))}
            </div>

          ) : (
            <p>Ainda não existem processos relacionados a este usuário</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PortalDocumentos;