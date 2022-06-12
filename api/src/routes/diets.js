const { Router } = require('express');
const models = require("../controllers/model.js")
const router = Router();

router.get("/", async(req,res,next)=>{

    try {
        const diet = await models.fillDB();
        res.status(200).send(diet.length>0?diet:"No hay temperamentos");
    } catch (error) {
        res.sendStatus(400);
    }
})


module.exports = router;