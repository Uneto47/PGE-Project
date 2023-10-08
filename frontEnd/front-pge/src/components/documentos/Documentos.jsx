import axios from "axios";
import { useEffect, useState } from "react";

function Documentos(props) {
  const { processoData } = props;

  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const documentosArray = [];


        for (const documento of processoData.documentos) {
          documentosArray.push(documento);
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
              <p className="ml-2">{documento.nome}.{documento.extensao} - {documento.caminho} </p>
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
