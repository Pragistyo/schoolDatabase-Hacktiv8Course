const express    = require('express')
const bodyParser = require('body-parser');
const app        = express();
const session    = require('express-session')


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const index    = require('./router/index.js');
const subjects = require('./router/subjects.js');
const students = require('./router/students.js');
const teachers = require('./router/teachers.js');

app.use(session({
  secret: 'keyboardzz cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))


app.use('/', index)
app.use('/subjects', subjects)
app.use('/students', students)
app.use('/teachers', teachers)


app.listen(process.env.PORT || 3003,()=>{
  console.log('Port 3003 Opened !');
})
