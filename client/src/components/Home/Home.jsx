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
  const diets = useSelector(state => state.food.diets);

  const dispatch = useDispatch();
  const ITEMS_PER_PAGE = 8;
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

  const nextHandler = () => {
    if (dataFromApi.filter(recipe => recipe.title.includes(search)).length > currentPage + 8) {
      pageCount = pageCount + 1;
      setCurrentPage(currentPage + ITEMS_PER_PAGE)
    }else{
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
               <Recipes allRecipes={filteredRecipes()} currentPage={0} nextHandler={nextHandler} prevHandler={prevHandler}/>
             }
           </ul>
         </div>
       </div>
  )
}

export default Home

// export class Home extends Component {


//   componentDidMount() {
//     //this.props.getAllRecipes();
//   }

//   filteredRecipes(){

//     return this.props.allRecipes;
//   }

//   nextHandler(){
    

//   }

//   prevHandler(){
    
//   }

//   render() {
//     return (
//       <div>
//         <div className={`${style.container}`}>
//           <ul className={`${style.slider}`}>
//             <li className={`${style.slide1}`}>
//               <img src={image1} alt="food1" />
//             </li>
//             <li className={`${style.slide2}`}>
//               <img src={image2} alt="food2" />
//             </li>
//             <li className={`${style.slide3}`}>
//               <img src={image3} alt="food3" />
//             </li>
//           </ul>
//         </div>
//         <div>
//           <ul>
//             {
//               <Recipes allRecipes={this.filteredRecipes()} currentPage={0} nextHandler={this.nextHandler} prevHandler={this.prevHandler}/>
//             }
//           </ul>
//         </div>
//             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas blanditiis doloremque facere ut. Tempore, eius fuga pariatur, tempora iste laboriosam cum ab maxime veniam est expedita doloribus impedit deserunt dolore?
//             Odit ipsam delectus quaerat, eligendi beatae laboriosam distinctio quam deserunt quia illum? Repudiandae earum quasi voluptatem repellendus perferendis numquam excepturi? Pariatur hic aliquid iusto numquam placeat, consequuntur eius officia veniam!
//             Ipsam, laboriosam tenetur accusantium temporibus dignissimos vel eaque ducimus esse dolorem? Totam, perferendis. Sapiente ad, cum neque aperiam ipsam accusantium non! Fugit incidunt ullam sunt similique dignissimos eveniet eius sed.
//             Eaque ipsam similique veniam alias, voluptas ad fugit sequi ipsum laborum magnam vero quasi corrupti? Hic quia cupiditate aliquid beatae incidunt ipsa quidem, facilis quam fugit reprehenderit esse, blanditiis vel.
//             Dolore iste nemo ex sit! Iusto saepe magni iure at itaque minima voluptate nobis quas quasi suscipit eaque atque sequi dolores, voluptatem ex quisquam quaerat amet minus doloribus earum. Tenetur!
//             Ducimus optio, consequatur animi consequuntur quaerat et corporis, molestiae exercitationem adipisci nostrum pariatur explicabo excepturi ut asperiores tenetur neque saepe velit commodi atque! Commodi recusandae et debitis aut iusto obcaecati?
//             Nesciunt voluptatibus quisquam, reiciendis, error magnam expedita deserunt sequi aperiam quas quis deleniti at vel animi facere sint odio, rem distinctio esse maiores provident dolores odit soluta quos doloremque? Ea.
//             Beatae, perferendis. Blanditiis perferendis doloribus enim officiis voluptates aut, itaque rerum saepe, ullam quod consequuntur illum commodi autem labore incidunt. Enim natus, voluptatibus possimus illum at aliquid necessitatibus numquam dolorum!
//             Excepturi illo corporis vitae omnis eius incidunt sed tenetur rem. Dolorum alias neque, asperiores cum voluptatem necessitatibus sunt ratione, velit hic mollitia deleniti ut consequatur blanditiis illo incidunt eos odio.
//             Esse distinctio exercitationem numquam quos saepe, veniam, quasi aperiam quibusdam in itaque et vel incidunt totam aliquid alias soluta nulla eveniet aliquam rerum quidem? Eaque, animi explicabo! Ut, quos ex!</p>

//       </div>
//     )
//   }
// }

// export const mapStateToProps = (state) => {
//   return {
//     allRecipes: state.food.allRecipes,
//   }
// }

// export const mapDispatchToProps = (dispatch) => {
//   return {
//     getAllRecipes: () => dispatch(getAllRecipes()),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home)
