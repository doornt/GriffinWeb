import { H5Manager } from "../Manager/H5Manager";
import { Div } from "./div";
import { Label } from "./label";
import { ImageView } from "./imageView";
import { Slider } from "./slider";
import { ComponentWrapper } from "./partial";

export const setup = () => {

    H5Manager.instance.register("$wrapper", ComponentWrapper)
    
    H5Manager.instance.register("div", Div)
    H5Manager.instance.register("label", Label)
    H5Manager.instance.register("text", Label)
    H5Manager.instance.register("img", ImageView)
    H5Manager.instance.register("slider", Slider)
    
    
}