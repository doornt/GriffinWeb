declare var global: {
    [k: string]: any
}


const initNetwork = ()=>{
    global.fetch = (url: string, params: { [key: string]: any }, callback: (any) => void) =>{
        global.Nativefetch(url, params, callback)
    }
}

export function init(){
    initNetwork()
}