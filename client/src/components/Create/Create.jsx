import React from "react";
import s from "./Create.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { postPokemons } from "../../actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../actions/actions.js";
import { NavLink } from "react-router-dom";

export default function Create() {
  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const dispatch = useDispatch();
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
    if (!input.name) {
    errors.name = "Obligatory field";
    }
    if (!input.img) {
      errors.img = "Obligatory field";
    }
    if (!input.hp) {
      errors.hp = "Obligatory field";
    }
    if (!input.attack) {
      errors.attack = "Obligatory field";
    }
    if (!input.defense) {
      errors.defense = "Obligatory field";
    }
    if (!input.speed) {
      errors.speed = "Obligatory field";
    }
    if (!input.height) {
      errors.height = "Obligatory field";
    }
    if (!input.weight) {
      errors.weight = "Obligatory field";
    }
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
        <input
          type="text"
          placeholder={errors.name ?  errors.name : " Name"} 
          name="name"
          value={input.name}
          className={errors.name ? s.danger : s.inputs}
          onChange={(e) => handelChange(e)}
        />
      
        <input
          type="text"
          placeholder= {errors.img ?  errors.img : " URL image"}            
          name="img"
          value={input.img}
          onChange={(e) => handelChange(e)}
          className={errors.img ? s.danger : s.inputs}
        />
        

        <input
          type="text"
          placeholder={errors.hp ?  errors.hp :" Hp"}
          name="hp"
          value={input.hp}
          onChange={(e) => handelChange(e)}
          className={errors.hp ? s.danger : s.inputs}
        />

        <input
          type="text"
          placeholder={errors.attack ?  errors.attack :" Attack"}
          name="attack"
          value={input.attack}
          onChange={(e) => handelChange(e)}
          className={errors.attack ? s.danger : s.inputs}
        />

        <input
          type="text"
          placeholder={errors.defense ?  errors.defense :" Defense"}
          name="defense"
          value={input.defense}
          onChange={(e) => handelChange(e)}
          className={errors.defense ? s.danger : s.inputs}
        />

        <input
          type="text"
          placeholder={errors.speed ?  errors.speed :" Speed"}
          name="speed"
          value={input.speed}
          onChange={(e) => handelChange(e)}
          className={errors.speed ? s.danger : s.inputs}
        />

        <input
          type="text"
          placeholder={errors.height ?  errors.height :" Height"}
          name="height"
          value={input.height}
          onChange={(e) => handelChange(e)}
          className={errors.height ? s.danger : s.inputs}
        />

        <input
          type="text"
          placeholder={errors.weight ?  errors.weight :" Weight"}
          name="weight"
          value={input.weight}
          onChange={(e) => handelChange(e)}
          className={errors.weight ? s.danger : s.inputs}
        />

        <select onChange={(e) => handelSelect(e)}>
          <option value="">Types</option>
          {allTypes.map((x) => (
            <option value={x.name} key={x.id}>
              {x.name}
            </option>
          ))}
        </select>
        <input type="submit" value="Create your pokemon" className={!Object.entries(errors).length ?  s.button: s.disable}  />
      </form>
    </div>
  );
}
