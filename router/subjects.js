const express = require('express');
const router  = express.Router();
const model   = require('../models')


router.get('/',(req,res)=>{
  model.Subject.findAll().then(blabla=>{
    res.render('subjects',{data:blabla})
    // res.send(blabla)
  })
})


//----------------------------ADD-------------------------------
//-------------------------GET EDIT-----------------------------
//-----------------------EDIT UPDATE----------------------------
//-------------------------DELETE-------------------------------
module.exports = router
