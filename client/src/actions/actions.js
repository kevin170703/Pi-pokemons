import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    const pokemons = await axios.get("http://localhost:3001/pokemons");
    return dispatch({ type: "GET_POKEMONS", payload: pokemons.data });
  };
}

export function getTypes() {
  return async function (dispatch) {
    const types = await axios.get("http://localhost:3001/types");
    return dispatch({ type: "GET_TYPES", payload: types.data });
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try {
      const detail = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({ type: "GET_DETAIL", payload: detail.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function nameSearch(name) {
  return async function (dispatch) {
    try {
      const searchName = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );
      return dispatch({ type: "GET_SEARCH", payload: searchName.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPokemons(data) {
  return async function (dispatch) {
    const createPokemon = await axios.post(
      `http://localhost:3001/pokemons`,
      data
    );
    return dispatch({ type: "POST_POKEMON", payload: createPokemon });
  };
}

export function SearchPokemons(name) {
  return async function (dispatch) {
    const pokemon = await axios.get(
      `http://localhost:3001/pokemons?name=${name}`
    );
    return dispatch({ type: "SERACH_POKEMONS", payload: pokemon.data });
  };
}

export function filterType(payload) {
  return { type: "FILTER_TYPE", payload };
}

export function fiterOrder(payload) {
  return { type: "FILTER_ORDER", payload };
}

export function filterAttack(payload) {
  return { type: "FILTER_ATTACK", payload };
}

export function filterCreate(payload) {
  return { type: "FILTER_CREATE", payload };
}
