import React from "react";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";
import s from "./Home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getPokemons,
  getTypes,
  filterType,
  fiterOrder,
  filterAttack,
  filterCreate,
} from "../../actions/actions.js";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const pokemons = useSelector((state) => state.pokemons);
  const type = useSelector((state) => state.type);
  const [update, setUpdate] = useState("");

  //---------------paginado----------------------//
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonsPorPagina] = useState(12);
  const indiceUltimoPokemon = paginaActual * pokemonsPorPagina;
  //        12                       1                 12
  const indicePrimerosPokemones = indiceUltimoPokemon - pokemonsPorPagina;
  //               0                       12                       12
  const all = pokemons.slice(indicePrimerosPokemones, indiceUltimoPokemon);
  //                                     0                    12

  // Para el paginado
  const paginado = (numeroDePagina) => {
    setPaginaActual(numeroDePagina);
  };
  //-------------------------------------//

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  //-----------------filtros---------------------------------//

  function handlefilterFunction(e) {
    e.preventDefault();
    dispatch(filterType(e.target.value));
  }

  function handlefilterOrder(e) {
    e.preventDefault();
    dispatch(fiterOrder(e.target.value));
    setUpdate(e.target.value);
  }

  function handlefilterAttack(e) {
    e.preventDefault();
    dispatch(filterAttack(e.target.value));
    setUpdate(e.target.value);
  }

  function handelFilterCreate(e) {
    e.preventDefault();
    dispatch(filterCreate(e.target.value));
    setUpdate(e.target.value);
  }
  if (!allPokemons.length) return <Loading />;
  else
    return (
      <div className={s.content}>
        <NavBar />
        <div className={s.filtros}>
          <div>
            <p>Types of pokemons </p>
            <select onChange={(e) => handlefilterFunction(e)}>
              <option value="All">All</option>
              {type.map((e) => (
                <option value={e.name} key={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Alphabetical order</p>
            <select onChange={(e) => handlefilterOrder(e)}>
              <option value="No filters">No Filters</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>
          <div>
            <p>Force</p>
            <select onChange={(e) => handlefilterAttack(e)}>
              <option value="No filters">No filters</option>
              <option value="stronger">stronger</option>
              <option value="weaker">weaker</option>
            </select>
          </div>
          <div>
            <p>Create</p>
            <select onChange={(e) => handelFilterCreate(e)}>
              <option value="No filters">No filters</option>
              <option value="create">Create</option>
              <option value="exist">Exist</option>
            </select>
          </div>
        </div>

          {all.map((x) => {
            return (
              <NavLink to={`pokemons/${x.id}`} key={x.id} className={s.links}>
                <Card name={x.name} img={x.img} type={x.types} id={x.id} />
              </NavLink>
            );
          })}

        <Paginado
          pokemonsPorPagina={pokemonsPorPagina}
          pokemons={pokemons}
          paginado={paginado}
        />
      </div>
    );
}
