const { Router } = require('express');
const models = require("../controllers/model.js")
const router = Router();

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

module.exports = router;