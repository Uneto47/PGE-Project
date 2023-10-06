import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Documentos from "../components/documentos/Documentos";

const BASE_URL = "http://localhost:3000";

function PortalDocumentos() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [clienteData, setClienteData] = useState(null);
  const [processoData, setProcessoData] = useState(null);
  const [advogadoData, setAdvogadoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clienteResponse = await axios.get(`${BASE_URL}/clientes/${id}`);
        setClienteData(clienteResponse.data);
        console.log(clienteResponse.data);

        const processoResponse = await axios.get(`${BASE_URL}/processos-judiciais/processo/${id}`);
        setProcessoData(processoResponse.data);
        console.log(processoResponse.data);

        const advogadoResponse = await axios.get(`${BASE_URL}/advogados/${processoResponse.data.responsavel}`);
        setAdvogadoData(advogadoResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Carregando dados...</p>
      ) : (
        <div>
          <h1>Dados do cliente:</h1>
          <p>Nome: {clienteData.nome}</p>
          <p>CPF: {clienteData.cpf}</p>
          {processoData ? (
            <div>
              <h1>Dados do processo judicial:</h1>
              <p>Número: {processoData.numeroprocesso}</p>
              <p>Responsável: {advogadoData.nome}</p>
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