const crypto = require('crypto');

function helperHash(salt,pass){
const cryptoHash = crypto.createHmac('sha256', salt)
                   .update(pass)
                   .digest('hex');
return cryptoHash
}


// console.log(helperHash('1hbf3r98','apapun'));
module.exports = helperHash
