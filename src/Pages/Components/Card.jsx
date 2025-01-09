import PropTypes from "prop-types";

import { Link } from "react-router-dom";

function Card({ data, index, isList, isLogged, handleClick }) {
  return (
    <>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <article>
          <h2>{data.name}</h2>
          <img
            src={data.sprites.front_default}
            alt={`Sprite of ${data.name}`}
          />
          {!data.types ? (
            <p>Something wrong...</p>
          ) : (
            data.types.map((data, index) => (
              <span className={`${data.type.name} type`} key={index}>
                {data.type.name}
              </span>
            ))
          )}
          {!isList && (
            <Link to={`/pokemon/${index}`} className="show-more-button">
              Show More
            </Link>
          )}
          {isList && (
            <>
              <p>
                <strong>Height :</strong> {data.height} decimeter |
                <strong>Weight:</strong> {data.weight} grams
              </p>
            </>
          )}
        </article>
      )}
    </>
  );
}

// Définition des PropTypes pour le composant Card
Card.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sprites: PropTypes.shape({
      front_default: PropTypes.string.isRequired,
    }).isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired, // index doit être un nombre
  isList: PropTypes.bool.isRequired, // isList doit être un booléen
};
export default Card;
