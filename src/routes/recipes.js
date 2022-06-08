const { default: axios } = require('axios');
const { Router } = require('express');
const models = require("../controllers/model.js");
const {Recipe} = require('../db.js');
const router = Router();
const {API_KEY} = process.env;

    router.get("/", async (req,res,next)=>{
        const {name} = req.query;
        try {
            let recipe;
            recipe = await models.getRecipe(name);
            res.status(200).send(recipe);
        } catch (error) {
            res.status(400).send(error)
        }
    })

    router.get("/:idRecipe", async (req,res,next)=>{
        const {idRecipe} = req.params;
        let rpta;
        try {
            let info = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`)
            rpta = info.data;
            let recipe = {
                title: rpta.title,
                id: rpta.id,
                readyInMinutes: rpta.readyInMinutes,
                image: rpta.image,
                summary: rpta.summary,
                diets: rpta.diets,
            }
            res.status(200).send(recipe)
        } catch (error) {
            res.status(400).send({error:"Recipe was not found."})
        }

    })

    router.post("/", async (req,res,next)=>{
        const {title, summary, health_score, recipe, diets} = req.body;
        const id = await models.getLastId()+1;
        try {
            const newRecipe = await Recipe.create({
                id:id, name:title, summary:summary, health_score:health_score, stepByStep:recipe, RecipeDiet:diets
            })
            console.log(newRecipe)
            res.status(201).send(newRecipe)
        } catch (error) {
            console.log(error)
        }
    })

module.exports = router;