import { Router } from "express";
import Pokedex from "pokedex-promise-v2";
import { API_BASE_URL } from "../contants/contants.js";

const P = new Pokedex();

const router = Router();

const fetchPokemon = (id) => {
  return fetch(`${API_BASE_URL}/getpokemon/?name=${id}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon with ID ${id}`);
      }
      return response.json();
    }
  );
};

router.get("/getpokemon/", (req, res) => {
  const { name } = req.query;

  if (!name)
    return res
      .status(400)
      .json({ message: `The name parameter is required` });

  P.getPokemonByName(name)
    .then((response) => {
      const totalMoves = response.moves.length;
      const randomIndex = Math.floor(Math.random() * totalMoves);

      return res.status(200).json({
        id: response.id,
        name: response.name,
        sprites: [
          response.sprites.front_default,
          response.sprites.back_default,
        ],
        move: response.moves[randomIndex].move.name,
      });
    })
    .catch((error) => {
      //   console.error(error);
      return res
        .status(400)
        .json({ message: `The ${name} pokemon was not found` });
    });
});

router.get("/getramdompokemon", (req, res) => {
  // P.getPokemonsList()
  //   .then((response) => {
      // const totalPokemonCount = response.count;
      const randomIndex = Math.floor(Math.random() * 600);

      fetchPokemon(randomIndex)
        .then((pokemon) => {
          res.status(200).json(pokemon);
        })
        .catch((error) => {
            console.error(error);
          res.status(500).json({
            message: "An error occurred while fetching a random Pokemon",
          });
        });
    })
    // .catch((error) => {
    //   //   console.error(error);
    //   return res
    //     .status(400)
    //     .json({ message: "Could not get total pokemon count" });
    // });

router.get("/getpokemonbyrange/", (req, res) => {
  const { start, end } = req.query;

  if (!start || !end)
    return res
      .status(400)
      .json({ message: "Start and End parameters are required" });

  const promises = [];

  for (let id = parseInt(start, 10); id <= parseInt(end, 10); id++) {
    promises.push(fetchPokemon(id));
  }


  Promise.all(promises)
    .then((pokemons) => {
      res.json(pokemons);
    })
    .catch((error) => {
        console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching Pokemon" });
    });
});

export default router;
