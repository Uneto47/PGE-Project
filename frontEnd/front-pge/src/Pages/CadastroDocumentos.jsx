import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CadastroDocumentos() {

  const [nome, setNome] = useState('');
  const [caminho, setCaminho] = useState('');
  const [extensao, setExtensao] = useState('');
  const [error, setError] = useState('');


  const handleFormSubmit = async (e) => {
    e.preventDefault();


    const documentoData = {
      nome,
      caminho,
      extensao
    };
    
    try {
      const response = await axios.post(`http://localhost:3000/documento/`, documentoData);
      console.log('Documento cadastrado com sucesso!', response.data);

      setNome('')
      setCaminho('')
      setExtensao('')
      setError('')

    } catch (error) {
      if (error.response && error.response.status === 422) {
        setError('Nome do Documento já cadastrado, use outro');
      } else {
        setError('Ocorreu um erro durante o login. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-200 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Novo Documento
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>

          <div>
            <label htmlFor="Nome do Documento" className="block text-sm font-medium leading-6 text-gray-900">Nome do Documento</label>
            <div className="mt-2">
              <input id="NomeDocumento"
                name="Nome do Documento"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="Caminho do Documento" className="block text-sm font-medium leading-6 text-gray-900">Caminho do Documento</label>
            <div className="mt-2">
              <input id="Caminho do Documento"
                name="Caminho do Documento"
                type="text"
                value={caminho}
                onChange={(e) => setCaminho(e.target.value)}
                required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="Extensão do Documento" className="block text-sm font-medium leading-6 text-gray-900">Extensão do Documento</label>
            <div className="mt-2">
              <input id="Extensão do Documento"
                name="Extensão do Documento"
                type="text"
                value={extensao}
                onChange={(e) => setExtensao(e.target.value)}
                required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div></div>

          <div>
            <button type="submit"
              className="flex w-full justify-center rounded-md bg-blue-800 px-3 
            py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600">
              Cadastrar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default CadastroDocumentos;