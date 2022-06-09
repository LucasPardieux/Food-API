const { Router } = require('express');
const models = require("../controllers/model.js")
const router = Router();

router.get("/", async(req,res,next)=>{
    await models.fillDB();
    res.sendStatus(200);
})


module.exports = router;