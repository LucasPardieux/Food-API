import React, { Component } from 'react'
import style from "./About.module.css"
import { MdFastfood } from "react-icons/md";
import { Link } from 'react-router-dom';
import img from "../../image/photo.jpg"

export default class About extends Component {
    render() {
        return (
            <div>
                <div className={`${style.cont}`}>
                    <div className={`${style.image}`}>
                        <img src={img} alt="profile img" />
                    </div>
                    <div className={`${style.information}`}>
                        <h1>Lucas Pardieux</h1>
                        <h3>Page developed with:</h3>
                        <h3><MdFastfood className={`${style.food}`} /> React-Redux</h3>
                        <h3><MdFastfood className={`${style.food}`} /> Express-Node.js</h3>
                        <h3><MdFastfood className={`${style.food}`} /> Sequelize-Postgres</h3>
                    </div>
                    <button><Link className={`${style.link}`} to='/home'>Go Home!</Link></button>
                </div>
            </div>
        )
    }
}
