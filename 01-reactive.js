// Object.defineProperty()
function defineProperty(obj,key,val){
    // 递归val
    observer(val)
    Object.defineProperty(obj,key,{
        get(){
            console.log('get',key);
            return val
        },
        set(v){
            if(val !==v){
                // 递归val
                observer(v)
                console.log('set',key,v);
                val = v
            }
        }
    })
}

// const obj = {};
// defineProperty(obj,'name','jaja')
// console.log(obj.name);
// obj.name = 'kk'
// console.log(obj);

// 2优化，递归遍历obj，动态拦截所有key
function observer(params) {
    if(typeof params !=='object' || params == null){
        return params
    }
    Object.keys(params).forEach(key => {
        defineProperty(params,key,params[key])
    })
}

function set(obj,key,val) {
    defineProperty(obj,key,val)
}

const obj = {
    foo:'foo',
    bar:'bar',
    baz:{
        a:1
    }
}
observer(obj)
// obj.baz
obj.baz.a = '111'