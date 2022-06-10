import React from 'react'
import style from "./Card.module.css"

const Card = ({ title, healthScore, servings, image, diets }) => {
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
                    <p>{diets}</p>
                </div>
            </div>
        </div>
        // <div>
        //     <div>
        //         <img src={image} alt="foods image" />
        //     </div>
        //     <div>
        //         <h2>{title}</h2>
        //         <div>
        //             <label>Health Score: </label>
        //             <p>{healthScore}</p>
        //             <label>Servings: </label>
        //             <p>{servings}</p>
        //             <label>Diets:</label>
        //             <p>{diets}</p>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Card