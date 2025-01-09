import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./Pages/Header";
import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Pokemon from "./Pages/Pokemon";
import Dashboard from "./Pages/Dashboard";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Is Logged
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("sessions"));
    if (session && session.isLogged) {
      setIsLogged(true); // L'utilisateur est connecté
    }
  }, []);

  //DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
        );
        const data = await response.json();

        const detailedData = [];

        for (let pokemon of data.results) {
          const res = await fetch(pokemon.url);
          const pokemonData = await res.json();
          detailedData.push(pokemonData);
        }
        setData(detailedData);
      } catch (err) {
        setError("Fetch failed. Try again.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header isLogged={isLogged} setIsLogged={setIsLogged} data={data} />
      <Routes>
        <Route
          path="/"
          element={<Home data={data} error={error} isLogged={isLogged} />}
        />
        <Route
          path="auth/login"
          element={<Login setIsLogged={setIsLogged} />}
        />
        <Route path="auth/register" element={<Register />} />
        <Route
          path="pokemon/:id"
          element={<Pokemon data={data} error={error} />}
        />
        <Route path="profil" element={<Dashboard isLogged={isLogged} />} />
      </Routes>
    </>
  );
}

export default App;
