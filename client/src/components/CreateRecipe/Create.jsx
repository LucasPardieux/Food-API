import React, { Component } from 'react'
import style from "./Create.module.css"
import { connect } from "react-redux";
import { getAllDiets, getAllRecipes, postRecipe } from "../../redux/reducer/reducer.js"

export class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      healthScore: 0,
      analyzedInstructions: [{number:0, step:""}],
      image: "",
      RecipeDiet: [],
      errors: {
        title: "",
        summary: "",
        healthScore: "",
        analyzedInstructions: "",
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

  firstWordUpperCase(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    const check = e.target.checked;
    let errors = this.state.errors;
     

    if(name === 'RecipeDiet' && check === false) {
      this.setState((state) => {
        let newArr = state.RecipeDiet;
        let index = newArr.indexOf(value)
        if(index != -1){
          let removed = newArr.splice(index, 1)
          return { [name]: newArr }
        }
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
      case 'healthScore':
        errors.healthScore = value < 0 || value > 100 ? 'The score must be in a range between 0 and 100' : '';
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

  handleSubmit(e) {
    e.preventDefault();
    let { title, summary, healthScore, analyzedInstructions, image, RecipeDiet } = this.state;
    RecipeDiet = RecipeDiet.join(" / ");
    title = this.firstWordUpperCase(title);
    const newRecipe = {
      title, summary, healthScore, analyzedInstructions, image, RecipeDiet
    }
    postRecipe(newRecipe)
    .then(()=>{
      let form = document.getElementById("form")
      form.reset();
      this.props.getAllRecipes();
      window.alert("successfully created Recipe")
    })
    .catch((error)=> window.alert("Error creating the dog", error))
  }

  handleSteps(e){
    const name = e.target.name;
    const input = document.getElementById("buttonStep").value;
    let lastStep = 0;
    if(name === 'analyzedInstructions'){
      this.setState((state)=>{
        for (let x in state.analyzedInstructions){
          lastStep = state.analyzedInstructions[x].number;
        }
        const newStep = {number:lastStep+1, step: input}        
        return {[name]: [...state.analyzedInstructions, newStep]}
      })
      return;
    }
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
                {!this.state.errors.title ? null : <div className={`${style.error}`}>{this.state.errors.title}</div>}
                <h5>summary:*</h5>
                <input name="summary" type="text" onChange={this.handleChange} />
                {!this.state.errors.summary ? null : <div className={`${style.error}`}>{this.state.errors.summary}</div>}
                <h5>Health score:</h5>
                <input name="healthScore" type="number" onChange={this.handleChange} />
                {!this.state.errors.healthScore ? null : <div className={`${style.error}`}>{this.state.errors.healthScore}</div>}
                <h5>Image url:*</h5>
                <input name="image" type="text" onChange={this.handleChange} />
                {!this.state.errors.image ? null : <div className={`${style.error}`}>{this.state.errors.image}</div>}
                <h5>Step by step:</h5>
                <textarea className={`${style.stepByStep}`} id='buttonStep' name="analyzedInstructions" type="text" min={6} max={19}/>
                {!this.state.errors.analyzedInstructions ? null : <div className={`${style.error}`}>{this.state.errors.analyzedInstructions}</div>}
                <button className={`${style.stepButton}`} name="analyzedInstructions" onClick={(e) => this.handleSteps(e)}>Add step</button>
              </div>
              <div className={`${style.stepsCont}`}>
                {this.state.analyzedInstructions?.map((r)=>{
                  return (<div className={`${style.steps}`} key={r.number}><p>{r.step}</p></div>)
                })}
              </div>
              <h5>Diet type:*</h5>
              <div className={`${style.checkCont}`}>
                <ul className={`${style.UndordenedList}`}>
                  {this.props.allDiets && this.props.allDiets?.map((diet) => {
                    return (
                      <li className={`${style.listItem}`} key={diet.id}>
                        <label htmlFor={diet.name}>{diet.name}</label><input type="checkbox" name="RecipeDiet" value={diet.name} onChange={this.handleChange} />
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
    getAllDiets: () => dispatch(getAllDiets()),
    getAllRecipes: () => dispatch(getAllRecipes())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create)