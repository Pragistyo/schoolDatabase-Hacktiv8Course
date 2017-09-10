const express = require('express');
const router  = express.Router();
const model   = require('../models')

//----------------------------FIRST PAGE---------------------------
router.get('/',(req,res)=>{
  model.Student.findAll().then(deny=>{
    res.render('students',{data:deny})
    // res.send(deny)
  })
  .catch(err=>{
    throw err.toString()
  })
})
//----------------------------ADD-------------------------------

router.get('/add',(req,res)=>{
  // res.send('hacktiv8')
  res.render('studentsAdd',{err_msg:false})
})

router.post('/add',(req,res)=>{
  // res.send('paijo')
  model.Student.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email
                    })
  .then(()=>{
    {res.redirect('/students')}
  })
  .catch(err=>{
    // res.send(err)
    // res.send('blabla')
    res.render('studentsAdd',{err_msg:"Validation error: email format is incorrect or already exist"})
  })
})
//-------------------------GET EDIT-----------------------------

router.get('/edit/:id',(req,res)=>{
  model.Student.findById(req.params.id).then(datanya=>{
    res.render('studentsEdit',{data:datanya,err_msg:false})
    // res.send(datanya)
  })
  .catch(err=>{
    throw err.toString()
  })
})

//-----------------------EDIT UPDATE----------------------------

router.post('/edit/:id',(req,res)=>{
  model.Student.update({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email

                        },{where:{id:req.params.id}})
  .then(()=>{
    res.redirect('/students')
  })
  .catch(err=>{
    model.Student.findById(req.params.id).then(datanya=>{
      res.render('studentsEdit',{data:datanya,err_msg:"Validation error: email format is incorrect"})
    })
  })
})

//----------------------ADD SUBJECT TO STUDENT--------------------------------
router.get('/:id/addsubject',(req,res)=>{
  model.Student.findById(req.params.id).then(rows=>{
    model.Subject.findAll().then(rowsSubject=>{
      res.render('subjectStudentAdd',{data:rows,dataSubject:rowsSubject,err_msg:false})
    })
  })
})

router.post('/:id/addsubject',(req,res)=>{
  model.StudentSubject.create({
                                StudentId:req.params.id,
                                SubjectId:req.body.SubjectId
                              })
  .then(()=>{
    res.redirect('/students')
  })
  .catch(err=>{
    throw err.toString()
  })
})

//-------------------------DELETE----------------------------------

router.get('/delete/:id',(req,res)=>{
  model.Student.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/students')
  })
})


module.exports = router