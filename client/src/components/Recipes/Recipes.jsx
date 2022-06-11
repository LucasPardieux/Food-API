import React from 'react'
import Card from '../Card/Card';
import style from "./Recipes.module.css"

const Recipes = (props) => {

    const eachRecipe = props.allRecipes?.map((r) => {
        return (
            <div className={`${style.eachRecipe}`}>
                <li key={r.id}>
                    <Card
                        title={r.title}
                        healthScore={r.healthScore}
                        servings={r.servings}
                        image={r.image}
                        diets={r.diets}
                    />
                </li>
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