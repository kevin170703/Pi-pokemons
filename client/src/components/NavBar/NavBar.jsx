import s from "./NavBar.module.css";
import pokeLogo from "../../img/pokeLogo.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { SearchPokemons, filterType } from "../../actions/actions.js";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function handelUpdate(e) {
    e.preventDefault();
    dispatch(filterType("All"));
  }

  function handelSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function searchPokemons(e) {
    e.preventDefault();
    dispatch(SearchPokemons(search.toLowerCase()));
    setSearch("");
  }

  return (
    <div className={s.content}>
      <NavLink to="/pokemons" className={s.logo}>
        <img src={pokeLogo} alt="pokeLogo" onClick={(e) => handelUpdate(e)} />
      </NavLink>
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
