import React from "react";
import s from "./Card.module.css";

export default function Card({ name, type, img, id }) {
  return (
    <div className={s.content} key={id}>
      <h2>{name}</h2>
      <img src={img} alt="fondo" />
      <h5>Type: {type.join(", ")}</h5>
    </div>
  );
}
