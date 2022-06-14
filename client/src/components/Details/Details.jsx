import React, { Component } from 'react'
import { connect } from "react-redux";
import { getAllDiets, getRecipe } from "../../redux/reducer/reducer.js"
import style from "./Details.module.css"
import { Link } from 'react-router-dom';


export class Details extends Component {

    componentDidMount(){
        this.props.getRecipe(this.props.match.params.recipeName);
    }

    showHtml(){
        return (<div className={`${style.page}`}>
            <div className={`${style.contenedor}`}>
                <img className={`${style.image}`} src={this.props.recipe[0]?.image?this.props.recipe[0].image:"Loading..."} alt={this.props.recipe[0]?.title} />
                <div className={`${style.information}`}>
                <h1>{this.props.recipe[0]?.title}</h1>
                    <h3><h1>Diets:</h1> {this.props.recipe[0]?.diets?this.props.recipe[0].diets:"Loading..."}</h3>
                    <h3><h1>Health Score:</h1> {this.props.recipe[0]?.healthScore?this.props.recipe[0].healthScore:"Loading..."}</h3>
                    <h3><h1>Ready In Minutes:</h1> {this.props.recipe[0]?.readyInMinutes?this.props.recipe[0].readyInMinutes:"N/D"}</h3>
                    <h3><h1>servings:</h1> {this.props.recipe[0]?.servings?this.props.recipe[0].servings:"N/D"}</h3>
                </div>
                <div className={`${style.summary}`}>
                <h3><h1>Summary:</h1> {this.props.recipe[0]?.summary?this.props.recipe[0].summary:"Loading..."}</h3>
                </div>
            </div>
            <Link to="/home"><button className={`${style.backButton}`}>Back</button></Link>
        </div>)
   }

  render() {
    return (
        <div>
        {console.log(this.props.recipe[0])}
        {this.props.loading === true ? "Loading..." : this.showHtml()}
    </div>
    )
  }
}

export const mapStateToProps = (state) => {
    return {
      allDiets: state.food.allDiets,
      recipe: state.food.recipe,
      loading: state.food.loading
    }
  };
  
  export const mapDispatchToProps = (dispatch) => {
    return {
      getAllDiets: () => dispatch(getAllDiets()),
      getRecipe: (name) => dispatch(getRecipe(name))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Details)