var vy = require('./main')
var assert = require('assert')

function testFunc(test,subject){
    let i = 0,keys=Object.keys(subject)
    let result = vy(subject)[test.name]((n,k,a) => {
        assert.equal(keys[i],k,`${test.name}: incorrect key value`)
        assert.equal(subject[keys[i]],n,`${test.name}: incorrect element value`)
        assert.deepEqual(a,subject,`${test.name}: incorrect obj passed`)
        i++
        return test.func(n,k,a)
    })
    assert.deepEqual(result,test.result)
}

[{
    name:'forEach',
    func:() => {},
    result: undefined,
},{
    name:'some',
    func:n => n > 2,
    result:true,
},{
    name:'every',
    func:n => n > 2,
    result:false,
},{
    name:'map',
    func:n => n+1,
    result:{a:2,b:3,c:4},
},{
    name:'filter',
    func:n => n > 2,
    result:{c:3},
}].forEach(test => testFunc(test,{a:1,b:2,c:3}));

[{
    name:'forEach',
    func:() => {},
    result: undefined,
},{
    name:'some',
    func:n => n > 2,
    result:true,
},{
    name:'every',
    func:n => n > 2,
    result:false,
},{
    name:'map',
    func:n => n+1,
    result:[2,3,4],
},{
    name:'filter',
    func:n => n > 2,
    result:[3],
}].forEach(test => testFunc(test,[1,2,3]))

function testReduceFunc(test,subject){
    let i = +!test.acm,keys=Object.keys(subject)
    var args = [(acm,n,k,a) => {
        return test.func(acm,n,k,a)
    }]
    if(test.acm !== undefined){
        args.push(test.acm)
    }
    let result = vy(subject)[test.name](...args)
    assert.deepEqual(result,test.result)
}

[{
    name:'reduce',
    func:(a,b) => a+b,
    acm: 0,
    result:6,
},{
    name:'objectify',
    func:(o,n,k) => o[n] = k,
    result:{'1':'a','2':'b','3':'c'},
}].forEach(test => testReduceFunc(test,{a:1,b:2,c:3}));

[{
    name:'reduce',
    func:(a,b) => a+b,
    // acm: 0,
    result:6,
},{
    name:'objectify',
    func:(o,n,k) => o[n] = k,
    result:{'1':'0','2':'1','3':'2'},
}].forEach(test => testReduceFunc(test,[1,2,3]))