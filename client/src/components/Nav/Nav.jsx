import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import style from './Nav.module.css'
import logo from "../../image/transparent-restaurant-icon-food-icon-wine-icon-5e0564d29e10c8.8996243915774117946474.png"

const Nav = () => {

    const contenedor = document.getElementById('NavCont')

    const doAnimation = (entry) => {
        entry.forEach(entry => {
            if(!entry.isIntersecting){
                console.log("vamoo");
            }
        });
    }

    const watcher = new IntersectionObserver(doAnimation, {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 1
    });

    

    useEffect(() => {
        if(contenedor !== null){
            watcher?.observe(contenedor);
        }
    }, [contenedor])
    


    return (
        <nav id='NavCont' className={`${style.menuContainer}`}>
            <input type="checkbox" aria-label="Toggle menu" />
            <span></span>
            <span></span>
            <span></span>
            <a href="/" className={`${style.menuLogo}`}>
                <img src={logo} alt="Puppy World" />
            </a>              <div className={`${style.menu}`}>
                <ul>
                    <li>
                        <Link className={`${style.link}`} to='/home' >Home</Link>
                    </li>
                    <li>
                        <Link className={`${style.link}`} to='/createRecipe' >Create</Link>
                    </li>
                    <li>
                        <Link className={`${style.link}`} to='/about' >About</Link>
                    </li>
                    <div className={`${style.form}`}>

                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Nav