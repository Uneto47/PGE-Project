function LoginUsuario() {

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Faça login em sua conta
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="Cpf" class="block text-sm font-medium leading-6 text-gray-900">CPF</label>
            <div class="mt-2">
              <input id="cpf"
                name="cpf"
                autocomplete="cpf"
                type="cpf"
                required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

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
              Entrar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default LoginUsuario;