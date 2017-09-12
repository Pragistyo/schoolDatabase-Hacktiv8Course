function convertScore(Student) {

  let letterConvert
  if(Student.StudentSubject.score == null){letterConvert = 'empty'}
  else if (Student.StudentSubject.score > 85){letterConvert = 'A'}
  else if (Student.StudentSubject.score > 70){letterConvert = 'B'}
  else if (Student.StudentSubject.score > 55){letterConvert = 'C'}
  else{letterConvert = 'E'}

  Student.dataValues.letterConvert = letterConvert
  console.log(Student);
  return Student
}

module.exports = convertScore
