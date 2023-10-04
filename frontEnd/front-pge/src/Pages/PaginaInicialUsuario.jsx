import { Link } from "react-router-dom";
import Body from "../components/Body";
import logo from "../assets/logo.jpg" ;


function PaginaInicialUsuario() {
  return (
    <div className="flex flex-col gap-5 bg-slate-200 min-h-screen">
      <div className="flex justify-between pr-5 bg-blue-900">
      <img src={logo} alt="Logo PGE" className="h-28" />
      <div className="flex flex-row gap-5 justify-end mt-6 text-white">
        <button className="rounded-lg bg-green-500 hover:bg-green-600 h-14 w-60 shadow-xl text-2xl font-bold transition duration-300 ease-in-out">
          <Link to="/loginusuario">Login</Link>
        </button>
        <button className="rounded-lg bg-green-500 hover:bg-green-600 h-14 w-60 shadow-xl text-2xl font-bold transition duration-300 ease-in-out">
          <Link to="/cadastrousuario">Cadastrar</Link>
        </button>
      </div>
      </div>
      <Body>
        <div className="flex flex-col font-bold gap-20 p-20 text-center">
        <h1 className="text-5xl">
          Bem-Vindos ao Portal Da Procuradoria Geral do Estado de Sergipe
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla autem vero impedit sapiente velit exercitationem neque magnam obcaecati iure ipsum pariatur eius fugiat expedita laboriosam quasi ducimus quam! Magnam!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quasi! Ipsum odit temporibus consequatur distinctio provident. Quo accusantium iure ad, ut, aspernatur deleniti neque aut optio unde explicabo ea quaerat.
        </p>
        </div>
      </Body>
    </div>
  );
}

export default PaginaInicialUsuario;