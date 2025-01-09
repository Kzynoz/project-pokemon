import { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function Login({ setIsLogged }) {
  const aliasRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function submitHandler(e) {
    // retir l'action de base du bouton dans un form
    e.preventDefault();

    // converti en JSON
    let localUser = JSON.parse(localStorage.getItem("localUser")) || [];

    const findUser = localUser.find(
      (data) => data.user === aliasRef.current.value
    );

    if (!findUser && aliasRef.current.value !== findUser.password) {
      setError("Error");
    }

    if (findUser) {
      const userInfo = {
        user: aliasRef.current.value,
        creation_date: findUser.creationDate,
        isAdmin: findUser.isAdmin,
        isLogged: true,
      };

      const session = JSON.stringify(userInfo);
      localStorage.setItem("sessions", session);
    }
    setIsLogged(true);
    navigate("/");
  }

  return (
    <main id="login">
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username :</label>
        <input type="text" name="username" id="username" ref={aliasRef} />

        <label htmlFor="password">Password :</label>
        <input type="text" name="password" id="password" ref={passwordRef} />
        {error && <p>{error}</p>}
        <button type="submit">Sign in</button>
      </form>
      <p>
        No Account yet ? :{" "}
        <Link to={"/auth/register"}>Click here to register</Link>
      </p>
    </main>
  );
}

export default Login;
