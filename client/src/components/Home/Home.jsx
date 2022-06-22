import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllRecipes, getAllDiets } from '../../redux/reducer/reducer'
import image1 from "../../image/pexels-photo-209449.jpeg"
import image2 from "../../image/pexels-photo-239581.webp"
import image3 from "../../image/pexels-photo-326281.jpeg"
import style from "./Home.module.css"
import Recipes from '../Recipes/Recipes';
import { useState } from 'react'
import { useEffect } from 'react'


const Home = () => {

  const allRecipes = useSelector(state => state.food.allRecipes);
  const loading = useSelector(state => state.food.loading);
  const allDiets = useSelector(state => state.food.allDiets);

  const dispatch = useDispatch();
  const ITEMS_PER_PAGE = 9;
  let pageCount = 0;

  const updateState = () => {
    let res = dispatch(getAllRecipes())
    let res2 = dispatch(getAllDiets())

    return res, res2;
  }

  useEffect(() => {
    if (allRecipes.length === 0) {
      updateState();
    }
  }, [])

  var [dataFromApi, satDataFromApi] = useState(allRecipes)
  var [items, setItems] = useState([...allRecipes].splice(0, ITEMS_PER_PAGE))
  var [currentPage, setCurrentPage] = useState(0);
  var [search, setSearch] = useState("");

  if (items.length === 0) {
    for (let index = 1; index < 100; index++) {
      if (allRecipes.length !== 0) {
        setItems([...allRecipes].splice(0, ITEMS_PER_PAGE))
        satDataFromApi(allRecipes)
      }
    }
  }

  const filteredRecipes = (props) => {
    if (props != undefined) {
      return props.slice(currentPage, currentPage + ITEMS_PER_PAGE)
    }

    if (search === undefined || search.length === 0) {
      return dataFromApi.slice(currentPage, currentPage + ITEMS_PER_PAGE)
    }
    const filtered = dataFromApi.filter(recipe => recipe.title.includes(search))
    return filtered.slice(currentPage, currentPage + ITEMS_PER_PAGE)
  }

  const dietSelect = (e) => {
    const diet = e.target.value;

    setCurrentPage(0);
    
    if (diet === "null") {
      return satDataFromApi(allRecipes)
    }
    const filteredRecipes = allRecipes.filter((r) => {
      if (r.hasOwnProperty("diets")) {
        return r.diets?.includes(diet)
      } else {
        return r.RecipeDiet?.includes(diet)
      }
    })
    satDataFromApi(filteredRecipes)
  }






  const nextHandler = () => {
    if (dataFromApi.filter(recipe => recipe.title?.includes(search)).length > currentPage + 8) {
      pageCount = pageCount + 1;
      setCurrentPage(currentPage + ITEMS_PER_PAGE)
    } else {
      setCurrentPage(currentPage)
    }
  }

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    pageCount = pageCount - 1;
    setCurrentPage(currentPage - ITEMS_PER_PAGE)
  }

  const searchHandler = () => {
    const input = document.getElementById("inputSearch").value;
    if (input) {
      var newInput = input.substring(1)
      let firstChar = input[0].toUpperCase()
      newInput = firstChar + newInput;
    } else {
      setCurrentPage(0)
      setSearch("")
      return
    }
    setCurrentPage(0)
    setSearch(newInput)
  }

  const healthOrder = (e) => {
    let value = e.target.value;
    let check = e.target.checked;


    if (check === false) {
      satDataFromApi(allRecipes);
    }

    if (value === "down") {
      const neatArray = [...dataFromApi].sort((next, prev) => {

        if (prev.healthScore < next.healthScore) {
          return 1;
        } else {
          return -1;
        }
        return 0

      })
      satDataFromApi(neatArray)
    }

    if (value === "up") {
      const neatArray = [...dataFromApi].sort((next, prev) => {

        if (prev.healthScore > next.healthScore) {
          return 1;
        } else {
          return -1;
        }
        return 0

      })
      satDataFromApi(neatArray)

    }
  }

  const alphaOrder = (e) => {
    const value = e.target.value;
    const check = e.target.checked;

    if (check === false) {
      satDataFromApi(allRecipes);
    }

    if (value === "up") {
      const neatArray = [...dataFromApi].sort((prev, next) => {
        if (prev.title > next.title) {
          return 1;
        }
        if (prev.title < next.title) {
          return -1;
        }
        return 0;
      })
      satDataFromApi(neatArray);
    }
    if (value === "down") {
      const neatArray = [...dataFromApi].sort((prev, next) => {
        if (prev.title > next.title) {
          return -1;
        }
        if (prev.title < next.title) {
          return 1;
        }
        return 0;
      })
      satDataFromApi(neatArray)
    }
  }

  return (
    <div>
      {window.document.title = 'L´assiette'}
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
    <div className={`${style.filters}`}>
      <div className={`${style.form}`}>
        <button className={`${style.buttonSearch}`} onClick={searchHandler}>Search</button>
        <input
          className={`${style.search}`}
          id='inputSearch'
          type="search"
          name="name"
          placeholder='Banana, Pizza, Smoothie...' />
      </div>
      <div className={`${style.tempSelect}`}>
        <select className={`${style.selector}`} defaultValue={"null"} name="diets" onChange={e => dietSelect(e)}>
          <option value="null">All</option>
          {allDiets?.map((diet) => {
            return <option key={diet.id}>{diet.name}</option>
          })}
        </select>
      </div>
      <div className={`${style.contSwitch1}`}>
          <p>Alphabetical order</p>
          <label className={`${style.switch}`}>
            <input type="checkbox" name="sort" className={`${style.switchInput}`} onClick={(e) => alphaOrder(e)} />
            <div className={`${style.rail}`}>
              <button className={`${style.button1}`} value={"up"} onClick={(e) => alphaOrder(e)}>▲</button>
              <button className={`${style.button2}`} value={"down"} onClick={(e) => alphaOrder(e)}>▼</button>
              <span className={`${style.circle}`}></span>
            </div>
            <span className={`${style.indicator}`}></span>
          </label>
        </div>
        <div className={`${style.contSwitch2}`}>
          <p>health Score</p>
          <label className={`${style.switch}`}>
            <input type="checkbox" name="sort" className={`${style.switchInput}`} onClick={(e) => healthOrder(e)} />
            <div className={`${style.rail}`}>
              <button className={`${style.button1}`} value={"up"} onClick={(e) => healthOrder(e)}>▲</button>
              <button className={`${style.button2}`} value={"down"} onClick={(e) => healthOrder(e)}>▼</button>
              <span className={`${style.circle}`}></span>
            </div>
            <span className={`${style.indicator}`}></span>
          </label>
        </div>
                
      </div>

      <div className={`${style.allRecipes}`}>
        <ul>
          {
            <Recipes allRecipes={filteredRecipes()} currentPage={0} nextHandler={nextHandler} prevHandler={prevHandler} />
          }
        </ul>
      </div>
    </div>
  )
}

export default Home