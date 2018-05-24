import { H5Component } from "../Runtime/export";

export class ComponentWrapper extends H5Component {

    constructor() {
        super()
    }

    public $onNativeEvent(type: string) {
        let masterEvent: string = "unknown"

        if (!this.$master) {
            return console.error("component not found!")
        }


        switch (type) {
            case "onAdded": {
                masterEvent = "onAdded"
                break
            }
            case "onRemoved": {

            }
        }

        let fn: Function = this.$master[masterEvent]

        if (!fn) {
            return console.error(`event ${masterEvent} not registered`)
        }

        fn.call(this.$master)
    }
}