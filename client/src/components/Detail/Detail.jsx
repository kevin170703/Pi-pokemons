import React from "react";
import s from "./Detail.module.css";
import Loading from "../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../actions/actions.js";
import { NavLink } from "react-router-dom";

export default function Detail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);
  const details = useSelector((state) => state.detail);

  if (details.length < 1) return <Loading />;
  else
    return (
      <div className={s.content}>
        <NavLink to="/pokemons" className={s.buttonback}></NavLink>
        <div className={s.img}>
          <h1>{details.name}</h1>
          <img src={details.img} alt={details.name} />
        </div>
        <div className={s.text}>
          <p>
            <b>Id: </b>
            {` ${details.id}`}
          </p>
          <p>
            {" "}
            <b>Type: </b>
            {`${details.type}`}
          </p>
          <p>
            <b>HP: </b>
            {` ${details.hp}`}
          </p>
          <p>
            <b>Attack: </b>
            {` ${details.attack}`}
          </p>
          <p>
            <b>Defense: </b>
            {` ${details.defense}`}
          </p>
          <p>
            <b>Speed: </b>
            {` ${details.speed}`}
          </p>
          <p>
            <b>Heigth: </b>
            {` ${details.height}`}
          </p>
          <p>
            <b>Weigth: </b>
            {` ${details.weight}`}
          </p>
        </div>
      </div>
    );
}
