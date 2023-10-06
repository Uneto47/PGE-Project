import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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

      if (tipoRecebido === "cliente") {
        try {
          const usuarioResponse = await axios.get(`${BASE_URL}/clientes/${id}`);
          setUsuarioData(usuarioResponse.data);

          const processoResponse = await axios.get(`${BASE_URL}/processos-judiciais/processo/cliente/${id}`);
          setProcessoData(processoResponse.data);

          const envolvidoResponse = await axios.get(`${BASE_URL}/advogados/${processoResponse.data.responsavel}`);
          setEnvolvido(envolvidoResponse.data);

        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else if (tipoRecebido === "advogado") {
        try {
          const databaseResponse = await axios.get(`${BASE_URL}/advogados/${id}`);
          setUsuarioData(databaseResponse.data);

          const processoResponse = await axios.get(`${BASE_URL}/processos-judiciais/processo/advogado/${id}`);
          setProcessoData(processoResponse.data);

          const envolvidoResponse = await axios.get(`${BASE_URL}/clientes/${processoResponse.data.parte}`);
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