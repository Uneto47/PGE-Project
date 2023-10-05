import React, { useState } from 'react';
import axios from 'axios';

function LoginUsuario() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [isAdvogado, setIsAdvogado] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isAdvogado ? "advogados" : "clientes";

    const userData = {
      cpf,
      senha
    };

    try {
      const response = await axios.post(`http://localhost:3000/auth/login`, userData);
      console.log('Login realizado com sucesso!', response.data);

      // Limpar campos e mensagens de erro
      setCpf('');
      setSenha('');
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('CPF ou senha incorretos. Por favor, verifique e tente novamente.');
      } else {
        setError('Ocorreu um erro durante o login. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
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
          Faça login em sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="Cpf" className="block text-sm font-medium leading-6 text-gray-900">CPF</label>
            <div className="mt-2">
              <input
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
                id="password"
                name="password"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginUsuario;
