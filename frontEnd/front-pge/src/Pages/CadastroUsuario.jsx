import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [isAdvogado, setIsAdvogado] = useState(false);
  const [oab, setoab] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isAdvogado ? "advogados" : "clientes" 

    const userData = {
      nome,
      cpf,
      senha
    };

    if (isAdvogado) {
      userData.oab = oab;
    }
    console.log(userData)

    try {
      const response = await axios.post(`http://localhost:3000/${endpoint}/`, userData);

      console.log('Cadastro realizado com sucesso!', response.data);
      console.log(response.data._id);

      setNome('');
      setCpf('');
      setSenha('');
      setoab('');
      navigate(`/cadastro/${response.data._id}`)
    } catch (error) {
      console.error('Erro ao cadastrar o usuário', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-200 px-6 py-12 lg:px-8  ">
        
      <div className="mt-2">
        <label>
          <input
            type="checkbox"
            checked={isAdvogado}
            onChange={() => setIsAdvogado(!isAdvogado)}
            className="mr-2"
          />
          Sou advogado
        </label>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Faça o Cadastro da sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="Nome" className="block text-sm font-medium leading-6 text-gray-900">Nome</label>
            <div className="mt-2">
              <input id="Nome"
                name="Nome"
                type="text"
                value = {nome}
                onChange={(e) => setNome(e.target.value)}
                required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="Cpf" className="block text-sm font-medium leading-6 text-gray-900">CPF</label>
            <div className="mt-2">
              <input id="cpf"
                name="cpf"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {isAdvogado && (
            <div>
              <label htmlFor="oab" className="block text-sm font-medium leading-6 text-gray-900">
                OAB
              </label>
              <div className="mt-2">
                <input
                  id="oab"
                  name="oab"
                  type="text"
                  value={oab}
                  required
                  onChange={(e) => setoab(e.target.value)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>)}

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
              <div className="text-sm">
              </div>
            </div>
            <div className="mt-2">
              <input id="password"
                name="password"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6"
              />
            </div>
          </div>

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

export default CadastroUsuario;