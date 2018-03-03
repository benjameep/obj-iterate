## Obj-Iterate
Give JS objects the same iterating methods as Arrays, for amazing one liners

``` js
var oi = require('obj-iterate')

var obj = {a:1,b:2,c:3}

/* Mess with the values directly without having to mess with Object.keys() */
oi(obj).map(n => n+1) // => {a:2,b:3,c:4}

/* Isn't this so much cleaner */
oi(obj).filter(n => n >= 2) // => {b:2,c:3}

/* than this? */
Object.keys(obj).reduce((o,k) => {
    if(obj[k] >= 2)
        o[k] = obj[k]
    return o
},{}) // => {b:2,c:3}

/* They act exactly like arrays, except that instead of an index it is the key */
oi(obj).reduce((arr,n,key) => arr.concat([n,key]),[]) 
// => [[1,'a'],[2,'b'],[3,'c']]
```
#### Implemented:
- forEach
- map
- filter
- reduce
- some
- every
- objectify

Objectify is just a convinence method for reduce
``` js
var oi = require('obj-iterate')

var arr = [{name:'a',data:1},{name:'b',data:2},{name:'c',data:3}]

 /* Makes turning arrays into objects much easier */
oi(arr).objectify((obj,n) => obj[n.name] = n.data)
// => {a:1,b:2,c:3}

/* And allows you to do some niffty things to objects like 
   like swapping the key and value roles */
var obj = {a:'A_value',b:'B_value',c:'C_value'}
oi(obj).objectify((o,n,key) => o[n] = key)
// => {A_value:'a','B_value':'b','C_value':'c'}
```