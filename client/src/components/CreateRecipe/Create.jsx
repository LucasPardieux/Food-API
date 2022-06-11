import React, { Component } from 'react'
import style from "./Create.module.css"
import { connect } from "react-redux";
import { getAllDiets } from "../../redux/reducer/reducer.js"

export class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      health_score: 0,
      stepByStep: "",
      image: "",
      RecipeDiet: [],
      errors: {
        title: "",
        summary: "",
        health_score: "",
        stepByStep: "",
        image: "",
      },
      disabled: true
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getAllDiets()
  }

  validarForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    if (valid) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    const check = e.target.checked;
    let errors = this.state.errors;

    if(name === 'RecipeDiet' && check === false) {
      this.setState((state) => {
        let newArr = state.RecipeDiet
        let index = newArr.indexOf(value)
        let removed = newArr.splice(index, 1)
        return { [name]: newArr }
      })
      return;
    }

    if(name === 'RecipeDiet') {
      this.setState((state) => {
        return { [name]: [...state.RecipeDiet, value] }
      });
      return;
    }

    

    switch (name){
      case 'title':
        let titlePattern = /[a-zA-Z]{2,100}/
        errors.title = titlePattern.test(value) ? '' : 'The title must have at least 2 characters and not contain any special characters or numbers'
        break;
      case 'summary':
        let summaryPattern = /[a-zA-Z]{2,500}/
        errors.summary = summaryPattern.test(value) ? '' : 'Summary must have at least 2 characters and not contain any special characters or numbers';
        break;
      case 'health_score':
        errors.health_score = value < 0 || value > 100 ? 'The score must be in a range between 0 and 100' : '';
        break;
      case 'stepByStep':
        let stepByStepPattern = /[a-zA-Z]{2,500}/
        errors.stepByStep = stepByStepPattern.test(value) ? '' : 'Step by step must have at least 2 characters and not contain any special characters or numbers';
        break;
      case 'image':
        let urlPattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        errors.image = urlPattern.test(value) ? '' : 'The image url is not valid';
        break;
      default:
        break;
      }

      this.setState({
        [name]: value,
        errors
      });
      this.validarForm(this.state.errors)
  }


  render() {
    return (
      <div className={`${style.creationPage}`}>
        <div className={`${style.contenedor}`}>
          <h1>Create your own Recipe</h1>
          <div className={`${style.form}`}>
            <form id='form' onSubmit={(e) => e.preventDefault()}>
              <div className={`${style.inputs}`}>
                <h5>Recipe title:*</h5>
                <input name="title" type="text" onChange={this.handleChange} />
                {!this.state.errors.name ? null : <div className={`${style.error}`}>{this.state.errors.name}</div>}
                <h5>summary:*</h5>
                <input name="summary" type="text" onChange={this.handleChange} />
                {!this.state.errors.bred_for ? null : <div className={`${style.error}`}>{this.state.errors.bred_for}</div>}
                <h5>Health score:</h5>
                <input name="health_score" type="text" onChange={this.handleChange} />
                {!this.state.errors.origin ? null : <div className={`${style.error}`}>{this.state.errors.origin}</div>}
                <h5>Step by step:</h5>
                <input name="stepByStep" type="number" min={6} max={19} onChange={this.handleChange} />
                {!this.state.errors.lifeSpan ? null : <div className={`${style.error}`}>{this.state.errors.lifeSpan}</div>}
                <h5>Image url:*</h5>
                <input name="image" type="text" onChange={this.handleChange} />
                {!this.state.errors.image ? null : <div className={`${style.error}`}>{this.state.errors.image}</div>}
              </div>
              <h5>Diet type:*</h5>
              <div className={`${style.checkCont}`}>
                <ul className={`${style.UndordenedList}`}>
                  {this.props.allDiets && this.props.allDiets.map((diet) => {
                    return (
                      <li className={`${style.listItem}`} key={diet.id}>
                        <label htmlFor={diet.title}>{diet.title}</label><input type="checkbox" name="RecipeDiet" value={diet.title} onChange={this.handleChange} />
                      </li>
                    )
                  })}
                </ul>

              </div>

              <input className={`${style.button}`} disabled={this.state.disabled} name="button" type="submit" value="Create Recipe" onClick={(e) => this.handleSubmit(e)} />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    allDiets: state.food.allDiets
  }
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getAllDiets: () => dispatch(getAllDiets())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create)