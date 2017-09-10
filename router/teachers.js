const express      = require('express');
const router       = express.Router();
const model        = require('../models')

//-----------------------------GET------------------------------
router.get('/',(req,res)=>{
  model.Teacher.findAll({include:[model.Subject]}).then(jainal=>{
    // res.send(jainal)
    res.render('teachers',{data:jainal})
    // res.send(jainal)
  })
})
//----------------------------ADD-------------------------------
router.get('/add',(req,res)=>{
  model.Subject.findAll().then(rowsSubject=>{
    res.render('teachersAdd',{data:rowsSubject,err_msg:false})
  })
})

router.post('/add',(req,res)=>{
  model.Teacher.create({
    first_name: req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    SubjectId:req.body.SubjectId
  }).then(()=>{
      res.redirect('/teachers')
  })
  .catch(err=>{
    res.render('teachersAdd',{err_msg: "Validation error: email format is incorrect or already exist"})
  })
})

//-------------------------GET EDIT-----------------------------
router.get('/edit/:id',(req,res)=>{
  model.Teacher.findById(req.params.id).then(rows=>{
    model.Subject.findAll().then(rowsSubject=>{
      // res.send(rows)
      res.render('teachersEdit',{data:rows,dataSubject:rowsSubject,err_msg:false})
    })
  })
})
//-----------------------EDIT UPDATE----------------------------
router.post('/edit/:id',(req,res)=>{
  model.Teacher.update({
                        first_name: req.body.first_name,
                        last_name:req.body.last_name,
                        email:req.body.email,
                        SubjectId:req.body.SubjectId
                      },
                      {
                          where:{id:req.params.id}
                      })
  .then(()=>{
    res.redirect('/teachers')
  })
  .catch(err=>{
    throw err.toString()
  })

})


//-------------------------DELETE-------------------------------
router.get('/delete/:id',(req,res)=>{
  model.Teacher.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/teachers')
  })
})

module.exports = router
