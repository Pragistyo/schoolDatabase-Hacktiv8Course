const express    = require('express');
const router     = express.Router();
const hashHelper = require('../helper/helperHash')
const model      = require('../models')

//GET LOGIN
router.get('/login',(req,res)=>{
  res.render('login',{pageTitle:'Login',err_msg:false})
})

//POST LOGIN
router.post('/login',(req,res,next)=>{
  model.User.findAll({where:{username:req.body.username}}).then(currentUser=>{
    // console.log(currentUser[0].password);
    // console.log('=========================');
    let garem = currentUser[0].salt
    let hash  = hashHelper(garem,req.body.password)
    // console.log(hash);
    if(currentUser[0].password === hash){
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

//REGISTER
router.get('/register',(req,res)=>{
  res.render('register',{pageTitle:"REGISTER",err_msg:false})
})

router.post('/register',(req,res)=>{
  // console.log(req.body.role);
  model.User.create({
                          username: req.body.username,
                          password:req.body.password,
                          role:req.body.role
  }).then(blabla=>{
    // console.log(blabla);
    res.redirect('/login')
  })
  .catch(err=>{
    console.log(err);
    res.render('register',{pageTitle:"REGISTER",err_msg:err.errors[0].message})
  })
})

//LOGOUT
router.get('/logout',(req,res)=>{
  req.session.destroy()
    res.redirect('/login')
})

//SESSION FOR INDEX
router.use((req,res,next)=>{
  if(req.session.Login){
    next()
  }
  else{
    res.redirect('/login')
  }
})

//INDEX CALL
router.get('/',(req,res)=>{
  res.render('index',{pageTitle:"hacktiv8 School Database",err_msg:false})
})

module.exports = router;
