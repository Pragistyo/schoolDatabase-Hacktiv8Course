const express = require('express');
const router  = express.Router();

router.get('/',(req,res)=>{
  res.render('index',{pageTitle:"hacktiv8 School Database"})
})

module.exports = router;
