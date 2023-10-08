import { Link } from "react-router-dom";
import Body from "../components/Body";
import logo from "../assets/logo.jpg";


function PaginaInicialUsuario() {
  return (
    <div className="flex flex-col gap-5">
      <Body>
        <div className="flex flex-col font-bold gap-12 p-10 text-center">
          <h1 className="text-5xl">
            Bem-Vindos ao Portal Da Procuradoria Geral do Estado de Sergipe
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla autem vero impedit sapiente velit exercitationem neque magnam obcaecati iure ipsum pariatur eius fugiat expedita laboriosam quasi ducimus quam! Magnam!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quasi! Ipsum odit temporibus consequatur distinctio provident. Quo accusantium iure ad, ut, aspernatur deleniti neque aut optio unde explicabo ea quaerat.
          </p>
          <div className="flex flex-row gap-3 justify-center text-white">
      <Link to="/login">
        <button className="flex justify-center items-center rounded-lg bg-green-500 hover:bg-green-600 h-12 w-28 shadow-xl text-lg font-bold transition duration-300 ease-in-out">
          Login
        </button>
      </Link>
      <Link to="/cadastro">
        <button className="flex  justify-center items-center rounded-lg bg-green-500 hover:bg-green-600 h-12 w-28 shadow-xl text-lg font-bold transition duration-300 ease-in-out">
          Cadastrar
        </button>
      </Link>
    </div>
        </div>
      </Body>
    </div>
  );
}

export default PaginaInicialUsuario;