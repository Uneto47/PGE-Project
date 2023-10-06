import axios from "axios";
import { useEffect, useState } from "react";

function Documentos(props) {
  const { processoData } = props;

  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const documentosArray = [];

        for (const documentoId of processoData.documentos) {
          const documentoResponse = await axios.get(`http://localhost:3000/documentos/${documentoId}`);
          documentosArray.push(documentoResponse.data);
        }

        setDocumentos(documentosArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocumentos();
  }, []);

  return (
    <div>
      <h1>DOCUMENTOS</h1>
      {documentos.length > 0 ? (
        <ul>
          {documentos.map((documento, index) => (
            <li key={index}>
              <p>{documento.nome}</p>
              <p>{documento.caminho} </p>
              <p>{documento.extensao}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum documento encontrado.</p>
      )}
    </div>
  );
}

export default Documentos;
