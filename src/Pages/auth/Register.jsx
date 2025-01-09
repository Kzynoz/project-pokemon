import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const aliasRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(null);

  const currendDate = new Date();
  const navigate = useNavigate();

  function handleSubmit(e) {
    // retir l'action de base du bouton dans un form
    e.preventDefault();
    // stock less infos dans un objet
    const user = {
      user: aliasRef.current.value,
      password: passwordRef.current.value,
      isAdmin: false,
      creationDate: currendDate,
    };

    // converti en JSON
    let localUser = JSON.parse(localStorage.getItem("localUser")) || [];

    const findUser = localUser.find(
      (data) => data.user === aliasRef.current.value
    );

    if (!findUser) {
      // Push dans le tableau
      localUser.push(user);

      // stock dans la variable locale
      localStorage.setItem("localUser", JSON.stringify(localUser));

      setError("User added !");
      navigate("/auth/login");
    } else {
      setError("Alias already exist !");
    }
  }

  return (
    <main id="register">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username :</label>
        <input type="text" name="username" id="username" ref={aliasRef} />

        <label htmlFor="password">Password :</label>
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
        />
        {error && <p>{error}</p>}
        <button type="submit">Create account</button>
      </form>
    </main>
  );
}

export default Register;
