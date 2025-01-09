import { useEffect, useState } from "react";
import Card from "./Components/Card";

function Home({ data, error, isLogged }) {
  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
    console.log("My fav", favourite);

    if (favourite.length > 0) {
      const session = JSON.parse(localStorage.getItem("sessions"));
      const user = session ? session.user : null;

      if (user) {
        // Récupère ou initialise l'objet de stockage
        let storage = JSON.parse(localStorage.getItem("favouritePokemon"));
        if (!storage) {
          storage = {}; // Initialiser comme un objet vide si c'est null
        }

        // Vérifie si l'utilisateur existe déjà dans le storage
        if (!storage[user]) {
          storage[user] = { favourites: [] }; // Initialise les favoris pour l'utilisateur
        }

        // Ajoute ou met à jour les Pokémon favoris pour cet utilisateur
        favourite.forEach((pokemon) => {
          const existingPokemon = storage[user].favourites.find(
            (p) => p.name === pokemon.name
          );

          if (!existingPokemon) {
            storage[user].favourites.push({
              name: pokemon.name,
              img: pokemon.sprites.front_default,
            });
          }
        });

        // Sauvegarde la liste mise à jour dans localStorage
        localStorage.setItem("favouritePokemon", JSON.stringify(storage));
      }
    }
  }, [favourite]);

  function handleClick(e) {
    const NAME = e.target.value;
    // recherche si le pokemon est bien dans la data
    const pokemon = data.find((data) => data.name === NAME);

    if (!pokemon) {
      console.log("Pokemon not found in data");
    }

    const updatedPokemon = favourite.find((data) => data.name === NAME);

    if (!updatedPokemon) {
      setFavourite((previousState) => [...previousState, pokemon]);
      console.log("Pokemon added to your favourite", pokemon.name);
    } else {
      setFavourite((previousState) =>
        previousState.filter((data) => data.name !== NAME)
      );
      console.log("Pokemon remove to your favourite", pokemon.name);
    }
  }

  function removeAll(e) {
    setFavourite([]);
  }

  function isFavourite(pokemonName) {
    return favourite.find((pokemon) => pokemon.name === pokemonName);
  }

  return (
    <main id="home">
      <section>
        <h1>Welcome to my Pokedex</h1>
        {isLogged && favourite.length > 0 && (
          <div className="favourite">
            You added {favourite.length} Pokemon to favourite
            <button onClick={removeAll}>Remove All</button>
          </div>
        )}
        {error && <p>{error}</p>}
        {!data ? (
          <p>Loading...</p>
        ) : (
          data.map((pokemon, index) => (
            <div
              key={index}
              // gestion de class dynamique
              className={isFavourite(pokemon.name) ? "selected" : ""}
            >
              {isLogged && (
                <button onClick={handleClick} value={pokemon.name}>
                  Add to favourite
                </button>
              )}
              <Card
                data={pokemon}
                index={index + 1}
                isList={false}
                isLogged={isLogged}
                handleClick={handleClick}
              />
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Home;
