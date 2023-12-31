import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginUsuario() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [isAdvogado, setIsAdvogado] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isAdvogado ? "advogado" : "cliente";

    const userData = {
      cpf,
      senha,
    };

    try {
      const response = await axios.post(`http://localhost:3000/auth/login/${endpoint}`, userData);
      console.log('Login realizado com sucesso!', response.data);

      setCpf('');
      setSenha('');
      setError('');
      navigate(`/login/${response.data.id}`, { state: { tipo: response.data.tipo } })
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('CPF ou senha incorretos. Por favor, verifique e tente novamente. Lembre-se de marcar a opção "Sou advogado", caso seja necessário.');
      } else {
        setError('Ocorreu um erro durante o login. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 py-10 items-center justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white mt-2 p-4 rounded-lg shadow relative">
          <h2 className="text-center text-xl font-bold leading-9 tracking-tight p-5 text-gray-900">
            Faça login em sua conta
          </h2>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="Cpf" className="block text-sm font-medium leading-6 text-gray-900">CPF</label>
            <div className="mt-2">
              <input
                placeholder='Digite seu CPF'
                id="cpf"
                name="cpf"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
              <div className="text-sm">
              </div>
            </div>
            <div className="mt-2">
              <input
                placeholder='Digite sua senha'
                id="password"
                name="password"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <label>
            <input
              type="checkbox"
              checked={isAdvogado}
              onChange={() => setIsAdvogado(!isAdvogado)}
              className="mr-2 mt-5"
            />
            Sou advogado
          </label>

          {error && (
            <p className="text-red-500 text-sm max-w-xs">{error}</p>
          )}

          <div >
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-800 px-3 
              py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
               focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
        <div className='flex items-center justify-center bg-slate-100 mt-2 rounded-lg shadow relative'>
          <Link to="/cadastro">
            <p className='flex justify-center p-5'> Ainda não tem cadastro? Cadastre-se </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginUsuario;
