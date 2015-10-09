var requireStack = require('../index')
try{
  requireStack('../test/modules')
}catch(e){
  console.log(e.stack)
}