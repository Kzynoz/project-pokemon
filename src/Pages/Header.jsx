import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import logo from "/logo-pokemon.png";

function Header({ isLogged, setIsLogged, data }) {
  const navigate = useNavigate();
  const location = useLocation();
  // search
  const [search, setSearch] = useState(null);
  const [display, setDisplay] = useState("");
  const [input, setInput] = useState("");
  // burger
  const [isToggle, setIsToggle] = useState(false);
  const open = <FontAwesomeIcon icon={faBars} />;
  const close = <FontAwesomeIcon icon={faXmark} />;

  function handleChange(e) {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const match = data.find((data) => data.name === value);
      if (match) {
        setSearch(match);
        setDisplay("");
      } else {
        setSearch(null);
        setDisplay("Not found");
      }
    } else {
      setSearch(null);
      setDisplay("");
    }
  }

  function killUser() {
    let storage = localStorage.removeItem("sessions");
    console.log("sessions kill");
    setIsLogged(false);
    navigate("/");
  }

  function onClickHandler(e) {
    e.target.textContent = isToggle ? open : close;
    setIsToggle(!isToggle);
  }
  useEffect(() => {
    // Ferme le menu chaque fois que la route change
    setIsToggle(false);
  }, [location]);
  return (
    <>
      <header>
        <NavLink to={"/"}>
          <img src={logo} alt="Mon logo" />
        </NavLink>
        <nav className={isToggle ? "nav-open" : "nav-close"}>
          {isToggle && (
            <button onClick={onClickHandler} className="close-menu">
              {close}
            </button>
          )}

          <NavLink to={"/"}>Home</NavLink>
          {!isLogged && <NavLink to={"auth/login"}>Login</NavLink>}
          {isLogged && <NavLink to={"profil"}>Dashboard</NavLink>}
          {isLogged && (
            <button onClick={killUser} className="disconnect">
              Disconnect
            </button>
          )}
        </nav>
        {!isToggle && <button onClick={onClickHandler}>{open}</button>}
        <aside>
          <form>
            <input
              type="text"
              name="search"
              id="search"
              value={input}
              placeholder="Search a pokemon…"
              //ref={searchRef}
              onChange={handleChange}
            ></input>
            {search && (
              <Link to={`/pokemon/${search.id}`}>1 Pokemon found !</Link>
            )}
            {display && <p>{display}</p>}
          </form>
        </aside>
      </header>
    </>
  );
}

export default Header;
