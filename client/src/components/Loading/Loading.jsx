import React from "react";
// import imgL from "../../img/carga.gif";
import s from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={s.loading}>
      <img
        src="https://c.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif"
        alt=""
      />
      <h1>Loading...</h1>
    </div>
  );
}
