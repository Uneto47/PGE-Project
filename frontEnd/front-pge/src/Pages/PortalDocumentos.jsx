import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Documentos from "../components/documentos/Documentos";

const BASE_URL = "http://localhost:3000";

function PortalDocumentos() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [usuarioData, setUsuarioData] = useState(null);
  const [processoData, setProcessoData] = useState(null);
  const [envolvido, setEnvolvido] = useState(null);
  const location = useLocation();
  const tipoRecebido = location.state.tipo;


  useEffect(() => {
    const fetchData = async () => {
      console.log(tipoRecebido)
      if (tipoRecebido === "cliente") {
        try {
          const usuarioResponse = await axios.get(`${BASE_URL}/cliente/${id}`);
          setUsuarioData(usuarioResponse.data);

          const processoResponse = await axios.get(`${BASE_URL}/processos-judiciais/processo/cliente/${id}`);
          setProcessoData(processoResponse.data);

          const envolvidoResponse = await axios.get(`${BASE_URL}/advogado/${processoResponse.data.responsavel}`);
          setEnvolvido(envolvidoResponse.data);

        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else if (tipoRecebido === "advogado") {
        try {
          const databaseResponse = await axios.get(`${BASE_URL}/advogado/${id}`);
          setUsuarioData(databaseResponse.data);

          const processoResponse = await axios.get(`${BASE_URL}/processos-judiciais/processo/advogado/${id}`);
          setProcessoData(processoResponse.data);

          const envolvidoResponse = await axios.get(`${BASE_URL}/cliente/${processoResponse.data.parte}`);
          setEnvolvido(envolvidoResponse.data);
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
          {processoData ? (
            <div>
              <h1>Dados do processo judicial:</h1>
              <p>Número: {processoData.numeroprocesso}</p>
              <p>{tipoRecebido === "advogado" ? "Cliente" : "Advogado"}: {envolvido.nome}</p>
              <Documentos processoData={processoData} />
              <p>Tema: {processoData.tema}</p>
              <p>Valor da Causa: {processoData.valorcausa}</p>
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