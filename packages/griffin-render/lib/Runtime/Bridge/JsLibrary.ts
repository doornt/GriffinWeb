declare var global: {
    [k: string]: any
}

const initNetwork = () => {
    global.fetch = (url: string, params: { [key: string]: any }, callback: (any) => void) => {
        global.Nativefetch(url, params, callback)
    }
}

export class JSLibrary{
    static init(){
        initNetwork()
    }

    static get navigator(){
        return {
            push: (options: { [key: string]: any }, callback: Function) => {
                if (!options.url) {
                    return
                }
                if (options.animated === null) {
                    options.animated = true
                }
                global.NavigatorPush(options.url, options.animated, callback)
            },
            pop: (options: { [key: string]: any }, callback: Function) => {
                if (options.animated === null) {
                    options.animated = true
                }
                global.NavigatorPop(options.animated, callback)
            }
        }
    }
}