# Require Stack

Nodejs require method does not provide filename or line number for syntax errors when requiring modules under try/catch statement.
Ideally it is not the problem with Node Js, it has something to do with v8 itself.

`Require Stack` is a wrapper around `require` method, which makes it easier to get syntax error with proper error stack when wrapping require call under `try/catch` block.

## Using Node Js

```javascript
try{
  require('./module/with/syntax/error')
}catch(e){
  console.log(e.stack)
}
```

above prints

```
SyntaxError: Unexpected token {
    at exports.runInThisContext (vm.js:53:16)
    at Module._compile (module.js:413:25)
    at Object.Module._extensions..js (module.js:452:10)
    at Module.load (module.js:355:32)
    at Function.Module._load (module.js:310:12)
    at Module.require (module.js:365:17)
    at require (module.js:384:17)
    at Object.<anonymous> (/Users/harmindervirk/workspace/personal/active-packages/require-stack/index.js:11:3)
    at Module._compile (module.js:434:26)
    at Object.Module._extensions..js (module.js:452:10)
```

Which is no reference to the filename or linenumber where syntax error has occured. File reference on line number 9 is the file from where code is executed.

## Using require stack 

```
var requireStack = require('require-stack')
try{
  requireStack('./module/with/syntax/error')
}catch(e){
  console.log(e.stack)
}
```

above prints

```
/Users/harmindervirk/workspace/personal/active-packages/require-stack/test/modules/index.js:2
  return {
         ^
ParseError: Unexpected token
```

Which has reference to the filename with exact line number

## Bonus

It does all the hard work required to setup error stack which can be parsed by [https://www.npmjs.com/package/stack-trace](https://www.npmjs.com/package/stack-trace).

![](https://d1zjcuqflbd5k.cloudfront.net/files/acc_433553/1lfOw?response-content-disposition=inline;%20filename=Screen%20Shot%202015-10-09%20at%202.27.07%20PM.png&Expires=1444383118&Signature=FrjfXdyei6AQOs95IA3Zb5aTBSYG7dPujFVm0EAUYOHVygncvXTBBlxLAstG8DHHLcPnhGUdWtjCqtNlqN7KOc-1TSREcDGR2z05IFf2i75H0xN9t9mS6NV2n0oS3stXVJbu0MoDmLPbLf~eqHZPdEVJ-3Ee6ITWQyoSqQFQvNo_&Key-Pair-Id=APKAJTEIOJM3LSMN33SA)