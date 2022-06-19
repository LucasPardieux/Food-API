import React from 'react'
import style from "./Card.module.css"

const Card = (props) => {

    const makeDiets = (diets) => {
        return diets?.join(" / ")
    }

    return (
        <div className={`${style.contenedor}`}>
            <div className={`${style.image}`}>
                <img src={props.image} alt="foods image" />
            </div>
            <div>
                <h3 className={`${style.name}`}>{props.title}</h3>
                <div className={`${style.information}`}>
                    <h4 className={`${style.subTitle}`}>Health Score: </h4>
                    <p>{props.healthScore}</p>
                    <h4 className={`${style.subTitle}`}>Servings: </h4>
                    <p>{props.servings}</p>
                    <h4 className={`${style.subTitle}`}>Diets:</h4>
                    <p>{props.RecipeDiet?props.RecipeDiet:makeDiets(props.diets)}</p>
                </div>
            </div>
        </div>
    )
}

export default Card