import React from 'react'
import style from "./Card.module.css"

const Card = ({ title, healthScore, servings, image, diets }) => {

    const makeDiets = (diets) => {
        return diets.join(" / ")
    }

    return (
        <div className={`${style.contenedor}`}>
            <div className={`${style.image}`}>
                <img src={image} alt="foods image" />
            </div>
            <div>
                <h3 className={`${style.name}`}>{title}</h3>
                <div className={`${style.information}`}>
                    <h4 className={`${style.subTitle}`}>Health Score: </h4>
                    <p>{healthScore}</p>
                    <h4 className={`${style.subTitle}`}>Servings: </h4>
                    <p>{servings}</p>
                    <h4 className={`${style.subTitle}`}>Diets:</h4>
                    <p>{makeDiets(diets)}</p>
                </div>
            </div>
        </div>
    )
}

export default Card