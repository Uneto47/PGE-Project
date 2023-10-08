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
      <strong><h1>DOCUMENTOS</h1></strong>
      {documentos.length > 0 ? (
        <ul>
          {documentos.map((documento, index) => (
            <li key={index}>
              <p className="ml-2 text-sm">{documento.nome}.{documento.extensao} - {documento.caminho} </p>
            </li>
          ))}
        </ul>
      ) : (
        <strong><p>Nenhum documento encontrado.</p></strong>
      )}
    </div>
  );
}

export default Documentos;
