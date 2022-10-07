import React from "react";
import s from "./Create.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { postPokemons } from "../../actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../actions/actions.js";
import { NavLink } from "react-router-dom";

export default function Create() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const [errors, setErrors] = useState({});
  const allTypes = useSelector((state) => state.type);

  const [input, setInput] = useState({
    name: "",
    img: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });

  function validate(input) {
    let errors = {};
    if (!input.name) errors.name = "Obligatory field";
    if (!/["A-Za-z"]/.test(input.name))
      errors.name = "name cannot contain characters";

    if (!input.img) errors.img = "Obligatory field";
    if (!/["A-Za-z"]/.test(input.img))
      errors.img = "name cannot contain characters";

    if (!input.hp) errors.hp = "Obligatory field";
    if (isNaN(input.hp)) errors.hp = "must be a number";

    if (!input.attack) errors.attack = "Obligatory field";
    if (isNaN(input.attack)) errors.attack = "must be a number";

    if (!input.defense) errors.defense = "Obligatory field";
    if (isNaN(input.defense)) errors.defense = "must be a number";

    if (!input.speed) errors.speed = "Obligatory field";
    if (isNaN(input.speed)) errors.speed = "must be a number";

    if (isNaN(input.height)) errors.height = "must be a number";
    if (!input.height) errors.height = "Obligatory field";

    if (!input.weight) errors.weight = "Obligatory field";
    if (isNaN(input.weight)) errors.weight = "must be a number";
    return errors;
  }

  function handelSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }

  function handelChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handelSubmit(e) {
    e.preventDefault();
    dispatch(postPokemons(input));
    alert("pokemon create");
    setInput({
      name: "",
      img: "",
      types: [],
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
    });
  }

  return (
    <div className={s.content}>
      <NavLink to="/pokemons" className={s.buttonback}></NavLink>
      <h1>Create your pokemon</h1>
      <form className={s.contentForm} onSubmit={(e) => handelSubmit(e)}>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder={errors.name ? errors.name : " Name"}
            name="name"
            value={input.name}
            className={errors.name ? s.danger : s.inputs}
            onChange={(e) => handelChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>URL image</label>
          <input
            type="text"
            placeholder=" URL image"
            name="img"
            value={input.img}
            onChange={(e) => handelChange(e)}
            className={errors.img ? s.danger : s.inputs}
          />
          {errors.img && <p>{errors.img}</p>}
        </div>
        <div>
          <label>Hp</label>
          <input
            type="text"
            placeholder=" Hp"
            name="hp"
            value={input.hp}
            onChange={(e) => handelChange(e)}
            className={errors.hp ? s.danger : s.inputs}
          />
          {errors.hp && <p>{errors.hp}</p>}
        </div>
        <div>
          <label>Attack</label>
          <input
            type="text"
            placeholder=" Attack"
            name="attack"
            value={input.attack}
            onChange={(e) => handelChange(e)}
            className={errors.attack ? s.danger : s.inputs}
          />
          {errors.attack && <p>{errors.attack}</p>}
        </div>
        <div>
          <label>Defense</label>
          <input
            type="text"
            placeholder=" Defense"
            name="defense"
            value={input.defense}
            onChange={(e) => handelChange(e)}
            className={errors.defense ? s.danger : s.inputs}
          />
          {errors.defense && <p>{errors.defense}</p>}
        </div>
        <div>
          <label>Speed</label>
          <input
            type="text"
            placeholder=" Speed"
            name="speed"
            value={input.speed}
            onChange={(e) => handelChange(e)}
            className={errors.speed ? s.danger : s.inputs}
          />
          {errors.speed && <p>{errors.speed}</p>}
        </div>
        <div>
          <label>Height</label>
          <input
            type="text"
            placeholder=" Height"
            name="height"
            value={input.height}
            onChange={(e) => handelChange(e)}
            className={errors.height ? s.danger : s.inputs}
          />
          {errors.height && <p>{errors.height}</p>}
        </div>
        <div>
          <label>Weight</label>
          <input
            type="text"
            placeholder=" Weight"
            name="weight"
            value={input.weight}
            onChange={(e) => handelChange(e)}
            className={errors.weight ? s.danger : s.inputs}
          />
          {errors.weight && <p>{errors.weight}</p>}
        </div>

        <select onChange={(e) => handelSelect(e)}>
          <option value="">Types</option>
          {allTypes.map((x) => (
            <option value={x.name} key={x.id}>
              {x.name}
            </option>
          ))}
        </select>
        <input
          type="submit"
          value="Create your pokemon"
          className={!Object.entries(errors).length ? s.button : s.disable}
        />
      </form>
      <div className={s.cardRednder}>
        <div>
          <h2>{input.name}</h2>
          <img src={input.img} alt={input.name} />
        </div>
        <h3>{input.types.join(", ")}</h3>
      </div>
    </div>
  );
}
