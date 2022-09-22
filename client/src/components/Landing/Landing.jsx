import React from "react";
import s from "./Landing.module.css";
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <div className={s.content}>
      <NavLink to="/pokemons" className={s.button}>
        Ingresar
      </NavLink>
    </div>
  );
}
