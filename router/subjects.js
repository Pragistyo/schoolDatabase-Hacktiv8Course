const express = require('express');
const router  = express.Router();
const model   = require('../models')


router.get('/',(req,res)=>{
  model.Subject.findAll({include:[model.Teacher]}).then(blabla=>{
    res.render('subjects',{data:blabla})
    // res.send(blabla)
  })
})

//----------------------------ENROLLED STUDENT-------------------------------
router.get('/:id/enrolledstudents',(req,res)=>{

  model.Subject.findById(req.params.id).then(rows=>{
    model.StudentSubject.findAll({
                                 include:[model.Student],
                                 where:{SubjectId:req.params.id}
                                })
      .then(rowsConjunction=>{
        // console.log('============================');
      // res.send(rowsConjunction)
      res.render('studentEnrolled',{data:rows,dataConjunction:rowsConjunction})
    })
  })
  .catch(err=>{
    throw err.toString()
  })
})

//-------------------------GIVE SCORE-----------------------------
router.get('/:id/givescore',(req,res)=>{
  model.Student.findById(req.params.id).then(rows=>{
    model.StudentSubject.findAll({
                                  include:[model.Subject],
                                  where:{StudentId:req.params.id},
                               })
    .then(rowsConjunction=>{
      console.log(rowsConjunction[0].SubjectId);
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
                              {where:{StudentId:req.params.id}}
                              )
  .then(()=>{
    res.redirect(`/subjects/${req.body.SubjectId}/enrolledstudent`)
  })
})


//-------------------------DELETE-------------------------------
module.exports = router
