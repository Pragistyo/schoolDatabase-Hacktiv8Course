const express = require('express');
const router  = express.Router();
const model   = require('../models')

//------------------------MIDDLEWARE SESSION-----------------------
router.use((req,res,next)=>{
  if((req.session.Login) && (req.session.role == 'teacher' || req.session.role == 'headmaster' || req.session.role == 'academic')){
    next()
  }
  else{
      res.render('index',{pageTitle:"hacktiv8 School Database",err_msg:'STUDENTS'})

  }
})

//----------------------------FIRST PAGE---------------------------
router.get('/',(req,res)=>{
  model.Student.findAll({order:[['first_name','ASC']]}).then(deny=>{
  // model.Subject.findAll({include:[model.Student]}).then(haha=>{
  //   res.send(haha)
  // })
    // let alphabetArr  = "abcdefghijklmnopqrstuvwxyz".split('')
    // for (var i = 0; i < deny.length; i++) {
    //   for (var j = i+1; j < deny.length; j++) {
    //     let index        =  alphabetArr.indexOf(deny[i].dataValues.first_name[0].toLowerCase())
    //     let indexSebelah =  alphabetArr.indexOf(deny[j].dataValues.first_name[0].toLowerCase())
    //     let tmp;
    //     if(index > indexSebelah){
    //         tmp       = deny[i]
    //         console.log(tmp);
    //         deny[i] = deny[j]
    //         deny[j] = tmp
    //       }
    //   }
    // }
    // res.send(deny)
    res.render('students',{data:deny,pageTitle:'Students'})
  })
  .catch(err=>{
    throw err.toString()
  })
})
//----------------------------ADD-------------------------------

router.get('/add',(req,res)=>{
  // res.send('hacktiv8')
  res.render('studentsAdd',{err_msg:false,pageTitle:"Add Student"})
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
    // res.send('blabla')
    res.render('studentsAdd',{err_msg:"Validation error: email format is incorrect or already exist",pageTitle:"Add Student"})
  })
})
//-------------------------GET EDIT-----------------------------

router.get('/edit/:id',(req,res)=>{
  model.Student.findById(req.params.id).then(datanya=>{
    res.render('studentsEdit',{data:datanya,err_msg:false,pageTitle:"editStudent"})
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
      res.render('studentsEdit',{data:datanya,err_msg:"Validation error: email format is incorrect",pageTitle:"editStudent"})
    })
  })
})

//----------------------ADD SUBJECT TO STUDENT--------------------------------
router.get('/:id/addsubject',(req,res)=>{
  model.Student.findById(req.params.id).then(rows=>{
    model.Subject.findAll().then(rowsSubject=>{
      res.render('subjectStudentAdd',{data:rows,dataSubject:rowsSubject,err_msg:false,pageTitle:"Add Subject to Student"})
    })
  })
})

router.post('/:id/addsubject',(req,res)=>{
  model.StudentSubject.findOne({where:{StudentId:req.params.id}}).then(conj=>{

    let count = false;
    for (var i = 0; i < conj.length; i++) {
      if(req.body.SubjectId == conj[i].SubjectId){
        count = true
      }
    }
    if(count == true){
      model.StudentSubject.create({
                                    StudentId:req.params.id,
                                    SubjectId:req.body.SubjectId
                                  })
      .then(()=>{
        res.redirect('/students')
      })
    }
    else{
      model.Student.findById(req.params.id).then(rows=>{
        model.Subject.findAll().then(rowsSubject=>{
          res.render('subjectStudentAdd',{data:rows,dataSubject:rowsSubject,err_msg:"Already has subject",pageTitle:"Add Subject to Student"})
        })
      })
    }
    // .catch(err=>{
    //     throw err.toString()
    //   })
    })
  })
//-------------------------DELETE----------------------------------

router.get('/delete/:id',(req,res)=>{
  model.Student.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/students')
  })
})


module.exports = router
