const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Types } = require("../db.js");

const { where } = require("sequelize");
const router = Router();
const moduls = require("../moduls/moduls");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ----------------------------------------------------------------------//

router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
  if (name) {
    const pokemonsNameApi = await moduls.pokemonNameSearchApi(name);
    if (pokemonsNameApi) return res.status(200).json([pokemonsNameApi]);
    const pokemonsNameBdd = await moduls.allPokemonsBdd();
    const search = pokemonsNameBdd.filter(
      (x) => x.name.toLowerCase() === name.toLowerCase()
    );
    if (!search.length)
      return res.status(404).json({ msg: "non-existent pokemon" });
    return res.status(200).json([...search]);
  }
  const allpo = await moduls.allPokemons();
  return res.status(200).json(allpo);
});

router.get("/types", async (req, res) => {
  try {
    const typess = await moduls.allType();
    res.status(200).json(typess);
  } catch (error) {
    console.log(error);
  }
});

router.get("/pokemons/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  if (isNaN(idPokemon)) {
    let detailBdd = await moduls.allPokemonsBdd();
    const detailPokemon = detailBdd.map((x) => {
      if (x.id === idPokemon) {
        return {
          id: x.id,
          img: x.img,
          name: x.name,
          type: x.types.map((x) => x),
          hp: x.hp,
          attack: x.attack,
          defense: x.defense,
          speed: x.speed,
          height: x.height,
          weight: x.weight,
        };
      }
    });
    return res.json(...detailPokemon);
  }
  const pokemonsId = await moduls.detailPokemon(idPokemon);
  res.status(200).json(pokemonsId);
});

router.post("/pokemons", async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, types, img } =
    req.body;
  if (!name) return res.status(404).send("Faltan parametros");

  const newPokemon = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
  });
  const pokemomType = await Types.findAll({ where: { name: types } });
  console.log(pokemomType);
  newPokemon.addTypes(pokemomType);
  res.send("Pokemon create oks");
});

module.exports = router;
