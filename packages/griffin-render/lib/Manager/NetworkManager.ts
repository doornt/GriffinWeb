
declare var global: {
    [k: string]: any
}

export class NetworkManager {

    private static $inst: NetworkManager

    private constructor() { }

    public static get instance() {
        if (!this.$inst) {
            this.$inst = new NetworkManager()
        }
        return this.$inst
    }

    public fetch(url: string, params: { [key: string]: any }, callback: (any) => void) {
        global.fetch(url, params, callback)
    }

}