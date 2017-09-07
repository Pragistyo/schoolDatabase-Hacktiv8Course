const express      = require('express');
const router       = express.Router();
const model        = require('../models')

//-----------------------------GET------------------------------
router.get('/',(req,res)=>{
  model.Teacher.findAll().then(jainal=>{
    res.render('teachers',{data:jainal})
    // res.send(jainal)
  })
})


//----------------------------ADD-------------------------------
//-------------------------GET EDIT-----------------------------
//-----------------------EDIT UPDATE----------------------------
//-------------------------DELETE-------------------------------
module.exports = router
