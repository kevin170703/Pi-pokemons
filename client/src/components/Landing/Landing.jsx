import React from "react";
import s from "./Landing.module.css";
import { NavLink } from "react-router-dom";
import linkedin from "../../img/linkedin.png";

export default function Landing() {
  return (
    <div className={s.content}>
      <NavLink to="/pokemons" className={s.button}>
        Ingresar
      </NavLink>
      <a
        className={s.links}
        href="https://www.linkedin.com/in/kevin-correa-dev/"
        target="_blank"
      >
        <img src={linkedin} alt="" />
      </a>
    </div>
  );
}
