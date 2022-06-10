import React, { Component } from 'react'
import { connect } from "react-redux"
import { getAllRecipes } from '../../redux/reducer/reducer'
import Card from '../Card/Card';

export class Home extends Component {

  componentDidMount(){
    this.props.getAllRecipes();
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.props.allRecipes?.map((r)=>{
              return (<li key={r.id}>
                      <Card 
                      title={r.title}
                      healthScore={r.healthScore}
                      servings={r.servings}
                      image={r.image}
                      diets={r.diets}
                      />
                    </li>)
            })
          }
        </ul>
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
