import { useEffect, useState } from "react";

function Dashboard({ isLogged }) {
  const [list, setList] = useState(null);
  const session = JSON.parse(localStorage.getItem("sessions"));

  useEffect(() => {
    const favouriteList = JSON.parse(localStorage.getItem("favouritePokemon"));
    const user = session ? session.user : null;

    // verifier que cet user est à une liste de favoris
    if (user && favouriteList[user]) {
      setList(favouriteList[user].favourites);
    } else {
      console.log("Error match");
    }
  }, []);

  function handleChange(pokemonToRemove) {
    const updateList = list.filter(
      (pokemon) => pokemon.name !== pokemonToRemove.name
    );

    console.log(updateList, "delete");
    setList(updateList);

    const favouriteList = JSON.parse(localStorage.getItem("favouritePokemon"));
    const user = session ? session.user : null;

    favouriteList[user].favourites = updateList;
    localStorage.setItem("favouritePokemon", JSON.stringify(favouriteList));
  }

  return (
    <div>
      {isLogged ? (
        <>
          <h1>Welcome {session.user}</h1>
          <p>
            You are a member since{" "}
            {new Date(session.creation_date).toLocaleDateString()} at{" "}
            {new Date(session.creation_date).toLocaleTimeString()}
          </p>
          {!list ? (
            <p>Loading...</p>
          ) : (
            <>
              <h2>List of your favourites</h2>
              <p>You have {list.length} pokemon has favourite</p>
              {console.log(list)}
              {list.map((pokemon, index) => (
                <article key={index}>
                  <button onClick={() => handleChange(pokemon)}>Delete</button>
                  <h2>{pokemon.name}</h2>
                  <img src={pokemon.img} alt={`Sprite of ${pokemon.name}`} />
                </article>
              ))}
            </>
          )}
        </>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}

export default Dashboard;
