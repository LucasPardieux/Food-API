import React from 'react'
import Card from '../Card/Card';
import style from "./Recipes.module.css"
import { Link } from 'react-router-dom';

const Recipes = (props) => {

    const eachRecipe = props.allRecipes?.map((r) => {
        return (
            <div className={`${style.eachRecipe}`}>
                <Link to={`/details/${r.title}`} className={`${style.linkCard}`}>
                <li >
                    <Card
                        key={r.id}
                        title={r.title}
                        healthScore={r.healthScore}
                        servings={r.servings}
                        image={r.image}
                        diets={r.diets}
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
                {eachRecipe}
            </ul>
        </div>
    )
}

export default Recipes