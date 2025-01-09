import Card from "./Components/Card";
import { useParams } from "react-router-dom";

function Pokemon({ data }) {
  let { id } = useParams(); // Récupère l'id depuis l'URL
  id = parseInt(id);
  const pokemon = data ? data[id - 1] : null;

  return (
    <main id="pokemon">
      <h1>You are looking for</h1>
      {!pokemon ? (
        <p>Error</p>
      ) : (
        <Card key={pokemon.id} data={pokemon} index={id} isList={true} />
      )}
    </main>
  );
}

export default Pokemon;
