const express = require('express');
const router  = express.Router();
const model   = require('../models')


router.get('/',(req,res)=>{
  model.Subject.findAll({include:[model.Teacher]}).then(blabla=>{
    res.render('subjects',{data:blabla,pageTitle:'Subjects'})
    // res.send(blabla)
  })
})

//----------------------------ENROLLED STUDENT-------------------------------
router.get('/:id/enrolledstudents',(req,res)=>{

  model.Subject.findById(req.params.id).then(rows=>{
    model.Subject.findAll({
                                 include:[model.Student],
                                 where:{id:req.params.id}
                                })
      .then(rowsConjunction=>{
      res.render('studentEnrolled',{data:rowsConjunction[0]})
    })
  })
  .catch(err=>{
    throw err.toString()
  })
})

//-------------------------GIVE SCORE-----------------------------
router.get('/:id/givescore/:SubjectId',(req,res)=>{
  console.log(req.body.SubjectId);
  model.Student.findById(req.params.id).then(rows=>{
    model.StudentSubject.findAll({
                                  include:[model.Subject],
                                  where:{
                                    StudentId:req.params.id,
                                    SubjectId:req.params.SubjectId
                                  }
                               })
    .then(rowsConjunction=>{
      res.render('subjectGiveScore',{data:rows,dataConjunction:rowsConjunction})
    })
  })
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
