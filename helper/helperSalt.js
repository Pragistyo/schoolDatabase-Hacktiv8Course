 function saltConvert(input) {
  let random = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = 0; i < input; i++)
    result += random[Math.floor(Math.random()*random.length)]

  return result
}

// console.log(saltConvert(8));

module.exports = saltConvert;
