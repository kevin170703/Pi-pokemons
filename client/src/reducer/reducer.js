const initialState = {
  allPokemons: [],
  pokemons: [],
  type: [],
  detail: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: action.payload,
      };
    case "GET_TYPES":
      return { ...state, type: action.payload };
    case "GET_DETAIL":
      return { ...state, detail: action.payload };
    case "POST_POKEMON":
      return { ...state };
    case "SERACH_POKEMONS":
      return { ...state, pokemons: action.payload };

    case "FILTER_TYPE":
      let allPokemons = state.allPokemons;
      const filtrado =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((x) => x.types.includes(action.payload));
      return { ...state, pokemons: filtrado };

    case "FILTER_ORDER":
      let filtradoOrder;
      if (action.payload === "No filters") {
        filtradoOrder = state.pokemons.sort(function (a, b) {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });
      } else if (action.payload === "A-Z") {
        filtradoOrder = state.pokemons.sort(function (a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });
      } else if (action.payload === "Z-A") {
        filtradoOrder = state.pokemons.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 0;
        });
      }
      return { ...state, pokemons: filtradoOrder };

    case "FILTER_ATTACK":
      let filterAttack;
      if (action.payload === "No filters") {
        filterAttack = state.pokemons.sort(function (a, b) {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });
      }
      if (action.payload === "stronger") {
        filterAttack = state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) return -1;
          if (a.attack < b.attack) return 1;
          return 0;
        });
      }
      if (action.payload === "weaker") {
        filterAttack = state.pokemons.sort(function (a, b) {
          if (a.attack < b.attack) return -1;
          if (a.attack > b.attack) return 1;
          return 0;
        });
      }
      return { ...state, pokemons: filterAttack };

    case "FILTER_CREATE":
      let filterCreate;
      if (action.payload === "No filters") filterCreate = state.allPokemons;
      if (action.payload === "create") {
        filterCreate = state.allPokemons.filter((x) => isNaN(x.id));
      }
      if (action.payload === "exist") {
        filterCreate = state.allPokemons.filter((x) => !isNaN(x.id));
      }
      return { ...state, pokemons: filterCreate };

    case "CLEAR_DETAIL":
      return { ...state, detail: [] };
    default:
      return { ...state };
  }
}
