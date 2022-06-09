import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './Nav.module.css'

export default class Nav extends Component {

    render() {
        return (
            <div className={`${style.menu}`}>
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
        )
    }
}