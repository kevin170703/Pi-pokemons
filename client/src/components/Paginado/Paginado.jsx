import React from "react";
import s from "./Paginado.module.css";

export default function Paginado({ pokemonsPorPagina, pokemons, paginado }) {
  const numeroDePaginas = [];
  for (let i = 1; i <= Math.ceil(pokemons.length / pokemonsPorPagina); i++) {
    //            1                      40                 12
    //            2                      40                 12
    //            3                      40                 12
    //            4                      40                 12
    numeroDePaginas.push(i);
  }
  return (
    <nav className={s.content}>
      {numeroDePaginas &&
        numeroDePaginas.map((numero) => (
          <div key={numero}>
            <button onClick={() => paginado(numero)}>{numero}</button>
          </div>
        ))}
    </nav>
  );
}
