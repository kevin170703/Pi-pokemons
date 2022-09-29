import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    const pokemons = await axios.get("/pokemons");
    return dispatch({ type: "GET_POKEMONS", payload: pokemons.data });
  };
}

export function getTypes() {
  return async function (dispatch) {
    const types = await axios.get("/types");
    return dispatch({ type: "GET_TYPES", payload: types.data });
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try {
      const detail = await axios.get(`/pokemons/${id}`);
      return dispatch({ type: "GET_DETAIL", payload: detail.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPokemons(data) {
  return async function (dispatch) {
    const createPokemon = await axios.post(`/pokemons`, data);
    return dispatch({ type: "POST_POKEMON", payload: createPokemon });
  };
}

export function SearchPokemons(name) {
  return async function (dispatch) {
    try {
      const pokemon = await axios.get(`/pokemons?name=${name}`);
      return dispatch({ type: "SERACH_POKEMONS", payload: pokemon.data });
    } catch (error) {
      console.log(error);
      alert("non-existent pokemon");
    }
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

export function clearDetail() {
  return { type: "CLEAR_DETAIL" };
}
