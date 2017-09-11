const express      = require('express');
const router       = express.Router();
const model        = require('../models')

//-----------------------------GET------------------------------
router.get('/',(req,res)=>{
  model.Teacher.findAll({order:[['first_name', 'ASC']],include:[model.Subject]}).then(jainal=>{

      // let alphabetArr  = "abcdefghijklmnopqrstuvwxyz".split('')
      // for (var i = 0; i < jainal.length; i++) {
      //   for (var j = i+1; j < jainal.length; j++) {
      //     let index        =  alphabetArr.indexOf(jainal[i].dataValues.first_name[0].toLowerCase())
      //     let indexSebelah =  alphabetArr.indexOf(jainal[j].dataValues.first_name[0].toLowerCase())
      //     let tmp;
      //     if(index > indexSebelah){
      //         tmp       = jainal[i]
      //         console.log(tmp);
      //         jainal[i] = jainal[j]
      //         jainal[j] = tmp
      //       }
      //   }
      // }
      // console.log(index);
      // res.send(jainal)
      res.render('teachers',{data:jainal,pageTitle:'Teachers'})
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
