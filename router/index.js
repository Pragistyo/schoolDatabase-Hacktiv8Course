const express = require('express');
const router  = express.Router();
const model   = require('../models')


router.get('/login',(req,res)=>{
  res.render('login',{pageTitle:'Login',err_msg:false})
})

router.post('/login',(req,res,next)=>{
  model.User.findAll({where:{username:req.body.username}}).then(currentUser=>{
    // res.send(currentUser)

    if(currentUser[0].password === req.body.password){
      req.session['Login']    = true
      req.session['username'] = currentUser[0].username
      req.session['role']     = currentUser[0].role
      res.redirect('/')
    }
    else{
      res.render('login',{pageTitle:'Login',err_msg:true})
    }
  })
  .catch(err=>{
    res.render('login',{pageTitle:'Login',err_msg:true})
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
    res.redirect('/login')
})

router.use((req,res,next)=>{
  if(req.session.Login){
    next()
  }
  else{
    res.redirect('/login')
  }
})

router.get('/',(req,res)=>{
  res.render('index',{pageTitle:"hacktiv8 School Database",err_msg:false})
})

module.exports = router;
