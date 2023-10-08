import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

    const endpoint = isAdvogado ? "advogado" : "cliente"

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

      setNome('');
      setCpf('');
      setSenha('');
      setoab('');
      navigate(`/cadastro/${response.data._id}`, { state: { tipo: endpoint } })
    } catch (error) {
      console.error('Erro ao cadastrar o usuário', error);
    }
  };

  return (
    <div className="flex flex-col gap-5 py-10 items-center justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white mt-2 p-4 rounded-lg shadow relative">
          <h2 className='text-center text-xl font-bold leading-9 tracking-tight p-5 text-gray-900'>
            Faça o Cadastro da sua conta
          </h2>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="Nome" className="block text-sm font-medium leading-6 text-gray-900">Nome</label>
            <div className="mt-2">
              <input id="Nome"
                name="Nome"
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

          <div className="mt-2">
            <label>
              <input
                type="checkbox"
                checked={isAdvogado}
                onChange={() => setIsAdvogado(!isAdvogado)}
                className="mr-2 mt-5"
              />
              Sou advogado
            </label>
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
        <div className='flex items-center justify-center bg-slate-100 mt-2 rounded-lg shadow relative'>
          <Link to="/login">
            <p className='flex justify-center p-5'> Ja tem cadastro? Entre na sua conta! </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuario;