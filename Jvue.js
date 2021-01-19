//拦截对象所有key
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

// 2.出现一个对象，就创建一个ob实例  
function observer(params) {
    if(typeof params !=='object' || params == null){
        return params
    }
    new Observer(params)
}

// function set(obj,key,val) {
//     defineProperty(obj,key,val)
// }

// Observer类，区分对象还是数组
class Observer{
    constructor(obj){
        this.obj = obj;
        if(Array.isArray(obj)){
            //todo
        }else{
            this.walk(obj)
        }
    }
    // 对象响应式
    walk(obj){
        //递归遍历obj，动态拦截所有key
        Object.keys(obj).forEach(key => {
            defineProperty(obj,key,obj[key])
        })
    }
}
// 3.代理vm.$data 到vm实例上
function proxy(vm) {
    Object.keys(vm.$data).forEach(key =>{
        Object.defineProperty(vm,key,{
            get(){
                return vm.$data[key]
            },
            set(v){
                vm.$data[key] = v
            }
        })
    })
}

// Vue类
class JVue {
    constructor(options){
        this.$options = options
        this.$data = options.data
        // 2.响应式处理
        observer(this.$data)
        // 3.代理data到Kvue实例上
        proxy(this)
        // 4.编译
        new Compile(option.el,this)
    }
}
class Compile {
    constructor(el,vm){
        this.$vm = vm
        this.$el = document.querySelector(el)
        this.compile(this.$el)
    }
}
