import React, { Component } from 'react'
import { connect } from "react-redux";
import { getAllDiets, getRecipe } from "../../redux/reducer/reducer.js"
import style from "./Details.module.css"
import { Link } from 'react-router-dom';
import img from "../../image/golden-frame-with-glitter-scatter_1017-30125.jpg"


export class Details extends Component {

  componentDidMount() {
    this.props.getRecipe(this.props.match.params.recipeName);
  }

  showHtml() {
    return (<div className={`${style.page}`}>
      <div className={`${style.contenedor}`}>
        {console.log(this.props.recipe[0])}
        {/* <img className={`${style.imageBackground}`} src={img} alt="background" /> */}
        <img className={`${style.image}`} src={this.props.recipe[0]?.image ? this.props.recipe[0].image : "Loading..."} alt={this.props.recipe[0]?.title} />
        <div className={`${style.information}`}>
          <h1>{this.props.recipe[0]?.title}</h1>
          <h3><h1>Diets:</h1> {this.props.recipe[0]?.diets ? this.props.recipe[0]?.diets : this.props.recipe[0]?.RecipeDiet}</h3>
          <h3><h1>Health Score:</h1> {this.props.recipe[0]?.healthScore ? this.props.recipe[0].healthScore : "Loading..."}</h3>
          <h3><h1>Ready In Minutes:</h1> {this.props.recipe[0]?.readyInMinutes ? this.props.recipe[0].readyInMinutes : "N/D"}</h3>
          <h3><h1>servings:</h1> {this.props.recipe[0]?.servings ? this.props.recipe[0].servings : "N/D"}</h3>
          <h3><h1>dish Type:</h1> {this.props.recipe[0]?.dishTypes ? this.props.recipe[0]?.dishTypes : "N/D"}</h3>
        </div>
      </div>
      <div className={`${style.summaryCont}`}>
        <div className={`${style.summary}`}>
          {/* <h3>{`${this.props.recipe[0]?.summary}` ? `${this.props.recipe[0]?.summary}` : "Loading..."}</h3> */}
          <span dangerouslySetInnerHTML={{ __html: this.props.recipe[0]?.summary}}></span>
        </div>
        <div className={`${style.steps}`}>
        <h3><h1>Steps:</h1>{this.props.recipe[0]?.analyzedInstructions[0]?.steps?.map((s) => { return (<div><h4 className={`${style.stepNumber}`}>Paso numero: {s.number}</h4><h5>{s.step}</h5></div>) })}</h3>
        <h3>{this.props.recipe[0]?.analyzedInstructions?.map((s) => {
          return s.number === 0 ? null : (<div><h4>Paso numero: {s.number}</h4><h5>{s.step}</h5></div>)
        })}</h3>
        </div> 
      </div>
      <Link to="/home"><button className={`${style.backButton}`}>Back</button></Link>
    </div>)
  }

  /*<span className={styles.Summary} dangerouslySetInnerHTML={{ __html: summary}}></span>*/

  render() {
    return (
      <div>
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