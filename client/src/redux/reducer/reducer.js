import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allRecipes: [],
    recipe:{},
    allDiets:[],
    diet:{},
    loading:false,
}

export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        setAllRecipes: function(state, action){
            state.allRecipes = action.payload;
        },
        setRecipe: function(state, action){
            state.recipe = action.payload;
        },
        setAllDiets: function(state, action){
            state.allDiets = action.payload;
        },
        setDiet: function(state, action){
            state.diet = action.payload;
        },
        setLoading: function(state, action){
            state.loading = action.payload
        }

    }
})


// -------------EXPORTS------------
export const {setAllRecipes, setRecipe, setAllDiets, setDiet, setLoading} = foodSlice.actions

export default foodSlice.reducer;

//--------------ACTIONS------------

export const getAllRecipes = () => async (dispatch) =>{

    try {
        dispatch(setLoading(true));
        const recipes = await axios.get("http://localhost:3001/recipes/");
        dispatch(setAllRecipes(recipes.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
    }
}

export const getRecipe = (name) => async (dispatch) =>{
        dispatch(setLoading(true));
    return axios.get(`http://localhost:3001/recipes?name=${name}`)
        .then((response) => response.data)
        .then((data) =>{
            dispatch(setRecipe(data))
            dispatch(setLoading(false))
        })
        .catch((error)=> console.log(error))
}

export const getAllDiets = () => async (dispatch) => {

    return axios.get(`http://localhost:3001/diet/`)
        .then((response) => response.data)
        .then((data) =>{
            dispatch(setAllDiets(data))
        })
        .catch((error)=> console.log(error))
}

export const postRecipe = (data) =>{
    try {
        return axios({
            method: "post",
            url: "http://localhost:3001/recipes",
            data: data
        })
    } catch (error) {
        return error
    }
}
