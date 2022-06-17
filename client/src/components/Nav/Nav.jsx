import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import style from './Nav.module.css'
import logo from "../../image/logo.png"
import {FaGithubSquare} from "react-icons/fa"
import {BsLinkedin} from "react-icons/bs"
//transparent-restaurant-icon-food-icon-wine-icon-5e0564d29e10c8.8996243915774117946474

const Nav = () => {

    // const contenedor = document.getElementById('NavCont')

    // const doAnimation = (entry) => {
    //     entry.forEach(entry => {
    //         if(!entry.isIntersecting){
    //             console.log(entry);
    //             entry.target.className = "Nav_notVisible__1-0HA"
    //         }else{
    //             //entry.target.className = "Nav_menuContainer__21ix7"
    //         }
    //     });
    // }

    // const watcher = new IntersectionObserver(doAnimation, {
    //     root: null,
    //     rootMargin: "0px 0px 0px 0px",
    //     threshold: 1
    // });



    // useEffect(() => {
    //     if(contenedor !== null){
    //         watcher?.observe(contenedor);
    //     }
    // }, [contenedor])



    return (
        <nav id='NavCont' className={`${style.menuContainer}`}>
            <input type="checkbox" aria-label="Toggle menu" />
            <span></span>
            <span></span>
            <span></span>
            <div className={`${style.menu}`}>
                <ul>
                    <li>
                        <Link className={`${style.link}`} to='/home' >Home</Link>
                    </li>
                    
                    <li>
                        <Link className={`${style.link}`} to='/createRecipe' >Create</Link>
                    </li>
                    <a href="/" className={`${style.menuLogo}`}>
                        <img src={logo} alt="Puppy World" />
                    </a>
                    <li>
                        <Link className={`${style.link}`} to='/about' >About</Link>
                    </li>
                    <li>
                        <a href="https://github.com/LucasPardieux" target="_blank"><FaGithubSquare className={`${style.gitHub}`}/></a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/lucas-pardieux/" target="_blank"><BsLinkedin className={`${style.linkedin}`}/></a>
                        
                    </li>
                    <div className={`${style.form}`}>

                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Nav