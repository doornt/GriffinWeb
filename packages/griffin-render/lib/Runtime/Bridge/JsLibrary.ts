declare var global: {
    [k: string]: any
}


class Response{

    private $data:any

    private $url:string

    constructor(data,url){
        this.$data =data
        this.$url =url
    }

    public json(){
        return new Promise(r=>r(this.$data))
    }
}

const initNetwork = () => {
    global.fetch = (url,params: { [key: string]: any }) => new Promise((resolve,reject)=>{
        global.nativeFetch(url, params, (data)=>{
            let resp = new Response(data,url)
            resolve(resp)
        })
    })
}

export class JSLibrary {
    static init() {
        initNetwork()
    }

    static get navigator() {
        return {
            push: (options: { [key: string]: any }, callback: Function) => {
                if (!options.id) {
                    return
                }
                if (options.animated == null) {
                    options.animated = true
                }
                global.Navigator().push(options.id, options.animated, callback)
            },
            pop: (options: { [key: string]: any }, callback: Function) => {
                if (options.animated === null) {
                    options.animated = true
                }
                global.Navigator().pop(options.animated, callback)
            }
        }
    }
}