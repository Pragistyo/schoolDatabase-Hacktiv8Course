const express      = require('express');
const router       = express.Router();
const model        = require('../models')
const convertScore = require('../helper/helperScore.js');

//------------------------MIDDLEWARE SESSION-----------------------
router.use((req,res,next)=>{
  if((req.session.Login)&&(req.session.role == 'headmaster' || req.session.role == 'academic')){
    next()
  }
  else{
    // res.redirect('/')
      res.render('index',{pageTitle:"hacktiv8 School Database",err_msg:'SUBJECTS'})
  }
})

//----------------------------FIRST PAGE---------------------------

router.get('/',(req,res)=>{
  model.Subject.findAll({include:[model.Teacher]}).then(blabla=>{
    res.render('subjects',{data:blabla,pageTitle:'Subjects'})
    // res.send(blabla)
  })
})

//----------------------------ENROLLED STUDENT-------------------------------
router.get('/:id/enrolledstudents',(req,res)=>{

  // model.Subject.findById(req.params.id).then(rows=>{
    model.Subject.findAll({
                                 include:[model.Student],
                                 where:{id:req.params.id}
                                })
      .then(rowsStudentConjunction=>{
        rowsStudentConjunction[0].Students.map(eachStudent=>{
          return convertScore(eachStudent)
        })
        // res.send(rowsStudentConjunction[0])//foreach Students
      res.render('studentEnrolled',{data:rowsStudentConjunction[0],pageTitle:"studentEnrolled"})
    })
  // })
  .catch(err=>{
    throw err.toString()
  })
})

//-------------------------GIVE SCORE-----------------------------
router.get('/:id/givescore',(req,res)=>{
  // console.log(req.body.SubjectId);
  // model.Student.findById(req.params.id).then(rows=>{
    model.StudentSubject.findAll({
                                  include:[{all:true}],
                                  where:{
                                       id:req.params.id
    //                                 StudentId:req.params.id,
    //                                 SubjectId:req.params.SubjectId
                                  }
                               })
    .then(rowsConjunction=>{
      // res.send(rowsConjunction[0])
      res.render('subjectGiveScore',{data:rowsConjunction,pageTitle:"Giv,{data:rowsConjue Score"})
      // res.render('subjectGiveScore',{data:rows,dataConjunction:rowsConjunction,pageTitle:"Give Score"})
    })
  // })
  .catch(err=>{
    throw err.toString()
  })
})

router.post('/:id/givescore',(req,res)=>{ //params punya student
  console.log('========================='+req.body.SubjectId);
  model.StudentSubject.update(
                              {score:req.body.score},
                              {where:{SubjectId:req.body.SubjectId,
                              $and: {StudentId:req.params.id}}}
                              )
  .then(()=>{
    res.redirect(`/subjects/${req.body.SubjectId}/enrolledstudents`)
  })
})


//-------------------------DELETE-------------------------------
module.exports = router
