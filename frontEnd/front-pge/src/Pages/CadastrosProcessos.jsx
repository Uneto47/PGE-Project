import React, { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CadastroDocumentos() {
  const { register, handleSubmit, control, setValue, getValues } = useForm();
const { fields, append, remove } = useFieldArray({
  control,
  name: 'documentos',
});

  const [numeroprocesso, setNumeroProcesso] = useState('');
  const [documentos, setDocumentos] = useState([]);
  const [parte, setParte] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [tema, setTema] = useState('');
  const [valorCausa, setValorCausa] = useState('');


  const handleFormSubmit = async (data) => {

    const { documentos } = data;

    const processoData = {
      numeroprocesso,
      parte,
      responsavel,
      documentos,
      tema,
      valorCausa
    };

    try {
      const response = await axios.post(`http://localhost:3000/processos-judiciais/`, processoData);

      console.log('Processo cadastrado com sucesso!', response.data);

      setNumeroProcesso('')
      setDocumentos('')
      setTema('')
      setParte('')
      setResponsavel('')
      setValorCausa('')

      // navigate(`/cadastro/${response.data._id}`, { state: { tipo: endpoint } })
    } catch (error) {
      console.error('Erro ao cadastrar o processo', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-200 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Novo Processo
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <label htmlFor="Numero do Processo" className="block text-sm font-medium leading-6 text-gray-900">Numero do Processo</label>
            <div className="mt-2">
              <input id="Numeroprocesso"
                name="Numero do Processo"
                type="text"
                value={numeroprocesso}
                onChange={(e) => setNumeroProcesso(e.target.value)}
                required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="Parte" className="block text-sm font-medium leading-6 text-gray-900">Parte</label>
            <div className="mt-2">
              <input id="Parte"
                name="Parte"
                type="text"
                value={parte}
                onChange={(e) => setParte(e.target.value)}
                required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="Responsavel" className="block text-sm font-medium leading-6 text-gray-900">
              Responsavel
            </label>
            <div className="mt-2">
              <input
                id="Responsavel"
                name="Responsavel"
                type="text"
                required
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm 
                  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="documentos" className="block text-sm font-medium leading-6 text-gray-900">
              Documentos
            </label>
            <div className="mt-2">
              {fields.map((field, index) => (
                <div key={field.id}>
                  <input
                    id={`documentos[${index}]`}
                    name={`documentos[${index}]`}
                    type="text"
                    defaultValue={''}
                    {...register(`documentos[${index}]`)} 
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-2 px-2 py-1 text-sm font-semibold text-red-600 border-1 border-gray-300 rounded-md hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Remover
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append()} // Use um objeto com um valor padrão para o campo
                className="mt-2 px-2 py-1 text-sm font-semibold text-gray-900 border-1 border-gray-300 rounded-md hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Adicionar
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="Tema" className="block text-sm font-medium leading-6 text-gray-900">Tema</label>
              <div className="text-sm">
              </div>
            </div>
            <div className="mt-2">
              <input id="Tema"
                name="Tema"
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="Valor do Processo" className="block text-sm font-medium leading-6 text-gray-900">Valor do Processo</label>
              <div className="text-sm">
              </div>
            </div>
            <div className="mt-2">
              <input id="Valor do Processo"
                name="Valor do Processo"
                type="number"
                value={valorCausa}
                onChange={(e) => setValorCausa(e.target.value)}
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

export default CadastroDocumentos;