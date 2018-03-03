let objectify = function(iteri){
    return this.reduce(function(acm){
        iteri(...arguments)
        return acm
    },{})
}

module.exports = function vy(obj){
    if(typeof obj != 'object')
        throw TypeError('Expecting an object')
    let funcs = ['forEach','some','every','map','filter','reduce','objectify']
    return funcs.reduce((mod,func) => {
        mod[func] = function(iteri/*,acm*/){
            let keys = Object.keys(obj),result,acm
            keys.objectify = objectify
            
            if(func == 'reduce'){
                if(arguments.length >= 2){
                    acm = arguments[1]
                } else {
                    acm = obj[keys.shift()]
                }
            }
            
            result = keys[func](function(){
                var isShifted = +['reduce','objectify'].includes(func)
                arguments[isShifted+1] = arguments[isShifted]
                arguments[isShifted] = obj[arguments[isShifted]]
                arguments[isShifted+2] = obj
                return iteri(...arguments)
            },acm)
            
            if(!Array.isArray(obj)){
                if(func == 'map'){
                    result = result.reduce((o,n,i) => {
                        o[keys[i]] = n
                        return o
                    },{})
                } else if(func == 'filter'){
                    result = result.reduce((o,n,i) => {
                        o[n] = obj[n]
                        return o
                    },{})
                }
            } else if (func == 'filter'){
                result = result.map(k => obj[k])
            }
            return result
        }
        return mod
    },{})
}