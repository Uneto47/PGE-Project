import React, { useState } from 'react';

function CadastroUsuario() {
  const [isAdvogado, setIsAdvogado] = useState(false);

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

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

      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Faça o Cadastro da sua conta
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="Nome" class="block text-sm font-medium leading-6 text-gray-900">Nome</label>
            <div class="mt-2">
              <input id="Nome"
                name="Nome"
                autocomplete="Nome"
                type="text"
                required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label for="Cpf" class="block text-sm font-medium leading-6 text-gray-900">CPF</label>
            <div class="mt-2">
              <input id="cpf"
                name="cpf"
                autocomplete="cpf"
                type="text"
                required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
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
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>)}

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Senha</label>
              <div class="text-sm">
              </div>
            </div>
            <div class="mt-2">
              <input id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button type="submit"
              class="flex w-full justify-center rounded-md bg-blue-800 px-3 
            py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600">
              Cadastarar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default CadastroUsuario;