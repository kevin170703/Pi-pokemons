import s from "./NavBar.module.css";
import pokeLogo from "../../img/pokeLogo.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { SearchPokemons } from "../../actions/actions.js";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function handelSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function searchPokemons(e) {
    e.preventDefault();
    dispatch(SearchPokemons(search));
  }

  return (
    <div className={s.content}>
      <Link to="/pokemons">
        <img src={pokeLogo} alt="pokeLogo" />
      </Link>
      <div className={s.search}>
        <NavLink to="/create" className={s.create}>
          Create Pokemon
        </NavLink>
        <form onSubmit={(e) => searchPokemons(e)}>
          <input
            type="text"
            placeholder="Search pokemon..."
            value={search}
            onChange={(e) => handelSearch(e)}
            className={s.inputT}
          />
          <input type="submit" value=" " className={s.buton} />
        </form>
      </div>
    </div>
  );
}
