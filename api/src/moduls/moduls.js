const axios = require("axios");
const { Pokemon, Types } = require("../db.js");

const detailPokemon = async (idPokemon) => {
  const idPokemons = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
  );
  return {
    id: idPokemons.data.id,
    img: idPokemons.data.sprites.other.home.front_default,
    name: idPokemons.data.name,
    type: idPokemons.data.types.map((x) => x.type.name),
    hp: idPokemons.data.stats[0].base_stat,
    attack: idPokemons.data.stats[1].base_stat,
    defense: idPokemons.data.stats[2].base_stat,
    speed: idPokemons.data.stats[5].base_stat,
    height: idPokemons.data.height,
    weight: idPokemons.data.weight,
  };
};

const pokemonNameSearchApi = async (name) => {
  try {
    const pokemonName = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return {
      id: pokemonName.data.id,
      name: pokemonName.data.name,
      img: pokemonName.data.sprites.other.home.front_default,
      type: pokemonName.data.types.map((x) => x.type.name),
    };
  } catch (error) {
    console.log(error);
  }
};

const allType = async () => {
  const types = await axios.get("https://pokeapi.co/api/v2/type");
  const date = types.data.results;
  date.forEach((e) =>
    Types.findOrCreate({
      where: {
        name: e.name,
      },
    })
  );

  const typess = await Types.findAll();
  return typess;
};

const allPokemonsApi = async () => {
  const pokemons = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=10"
  );
  const pokemonsApi = pokemons.data.results;
  const pokemonsApi2 = [];
  for (let i = 0; i < pokemonsApi.length; i++) {
    const pokemonsI = await axios.get(pokemonsApi[i].url);

    pokemonsApi2.push({
      id: pokemonsI.data.id,
      name: pokemonsI.data.name,
      img: pokemonsI.data.sprites.other.home.front_default,
      types: pokemonsI.data.types.map((t) => t.type.name),
      attack: pokemonsI.data.stats[1].base_stat,
    });
  }

  return pokemonsApi2;
};

const allPokemonsBdd = async () => {
  const pokemons = await Pokemon.findAll({
    include: {
      model: Types,
      attributes: ["name"],
    },
  });
  return pokemons.map((x) => ({
    id: x.id,
    name: x.name,
    img: x.img,
    attack: x.attack,
    types: x.types.map((x) => x.name),
    hp: x.hp,
    defense: x.defense,
    speed: x.speed,
    height: x.height,
    weight: x.weight,
    created: x.createdInDb,
  }));
};

const allPokemons = async () => {
  const pokemonsApi = await allPokemonsApi();
  const pokemonsBd = await allPokemonsBdd();
  return [...pokemonsApi, ...pokemonsBd];
};

module.exports = {
  detailPokemon,
  pokemonNameSearchApi,
  allType,
  allPokemonsApi,
  allPokemonsBdd,
  allPokemons,
};
