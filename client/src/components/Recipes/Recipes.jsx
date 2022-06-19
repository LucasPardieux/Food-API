import React from 'react'
import Card from '../Card/Card';
import style from "./Recipes.module.css"
import { Link } from 'react-router-dom';
import img from "../../image/3782014.png"

const Recipes = (props) => {

    const eachRecipe = props.allRecipes?.map((r) => {
        return (
            <div className={`${style.eachRecipe}`}>
                <Link to={`/details/${r.title}`} className={`${style.linkCard}`}>
                <li key={r.id}>
                    <Card
                        key={r.id}
                        title={r.title}
                        healthScore={r.healthScore}
                        servings={r.servings}
                        image={r.image}
                        diets={r.diets?r.diets:null}
                        RecipeDiet={r.RecipeDiet?r.RecipeDiet:null}
                    />
                </li>
                </Link>
            </div>
        )
    })
    return (
        <div className={`${style.contenedor}`}>
            <div className={`${style.prevNext}`}>
                <button onClick={props.prevHandler}>Prev</button>
                <p>/</p>
                <button onClick={props.nextHandler}>Next</button>
            </div>
            <ul className={`${style.ulRecipe}`}>
                {props.allRecipes.length!=0?eachRecipe:<img src={img} alt="no food found"/>}
            </ul>
        </div>
    )
}

export default Recipes