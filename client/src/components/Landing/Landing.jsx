import React, { Component } from 'react'
import style from "./Landing.module.css"
import { Link } from 'react-router-dom'

export default class Landing extends Component {
  render() {
    return (
        <div className={`${style.page}`}>
        <img className={`${style.background}`} src={"https://wallpaperaccess.com/full/532742.jpg"} alt="WelcomeImage" />
        <img className={`${style.image}`} src="https://img.freepik.com/foto-gratis/comida-peruana-ceviche-lomo-saltado-piqueo-elegante-mesa-restaurante_97105-90.jpg?w=2000" alt="" />
        <h1>Welcome to L´asiiette Restaurant</h1>
        <Link className={`${style.link}`} to='/home'><button>Go Home</button></Link>
    </div>
    )
  }
}
