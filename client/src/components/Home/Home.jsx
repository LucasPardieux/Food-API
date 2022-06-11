import React, { Component } from 'react'
import { connect } from "react-redux"
import { getAllRecipes } from '../../redux/reducer/reducer'
import image1 from "../../image/pexels-photo-209449.jpeg"
import image2 from "../../image/pexels-photo-239581.webp"
import image3 from "../../image/pexels-photo-326281.jpeg"
import style from "./Home.module.css"
import Recipes from '../Recipes/Recipes';

export class Home extends Component {

  componentDidMount() {
    this.props.getAllRecipes();
  }

  filteredRecipes(){

    return this.props.allRecipes;
  }

  nextHandler(){
    

  }

  prevHandler(){
    
  }

  render() {
    return (
      <div>
        <div className={`${style.container}`}>
          <ul className={`${style.slider}`}>
            <li className={`${style.slide1}`}>
              <img src={image1} alt="food1" />
            </li>
            <li className={`${style.slide2}`}>
              <img src={image2} alt="food2" />
            </li>
            <li className={`${style.slide3}`}>
              <img src={image3} alt="food3" />
            </li>
          </ul>
        </div>
        <div>
          <ul>
            {
              <Recipes allRecipes={this.filteredRecipes()} currentPage={0} nextHandler={this.nextHandler} prevHandler={this.prevHandler}/>
            }
          </ul>
        </div>


      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    allRecipes: state.food.allRecipes,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getAllRecipes: () => dispatch(getAllRecipes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
