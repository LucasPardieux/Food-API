const { default: axios } = require('axios');
const { conn, Recipe, Diet } = require('../db')
const  { API_KEY } = process.env;

module.exports = {

    getDiets: function(){
        let arrayAux =[];
        let rpta

        return axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)
            .then((info)=>{
                rpta = info.data.results;
                for(let x in rpta){
                    if(rpta[x].diets!==undefined){
                        var dietAux = rpta[x].diets;
                    }
                    for(let y in dietAux){ 
                        arrayAux.push(dietAux[y])
                    }
                }
                let finalDiets = [...new Set(arrayAux)];
                return finalDiets;
            })
            .catch((err)=>{
                return err;
            })
    },

    fillDB: async function(){
        let diets = await this.getDiets();
        const dietDB = await Diet.findAll();
        if(dietDB.length===0){
            for(let x in diets){ 
                await Diet.create({
                    name:diets[x]
                }) 
            }
        }
    },

    getRecipe: async function(name){

        let arrayAux = [];
        let rpta;
        try {
            const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)
            const infoDB = await Recipe.findAll();
            rpta = info.data.results;
            let arrayConcat = rpta.concat(infoDB)
                if (name !== undefined) {
                    arrayAux = arrayConcat.filter((recipe) => recipe.title.includes(name));
                    if (arrayAux.length === 0) throw new Error({ error: "The requested recipe was not found" });
                    return arrayAux;
                } else {
                    return arrayConcat;
                }
        } catch (error) {
            throw new Error(err);
        }
    },

    getLastId: async function (){
        let lastRecipe = await this.getRecipe();
        let arrayId =[];
        for(let x in lastRecipe){
            arrayId.push(lastRecipe[x].id)
        } 
        let lastID = arrayId.sort((a, b)=>{
            return a-b;
        })
        lastID = lastID.pop();
        return lastID;
    },

}