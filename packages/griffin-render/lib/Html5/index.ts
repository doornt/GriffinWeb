import { H5Manager } from "../Manager/H5Manager";
import { Div } from "./div";
import { Label } from "./label";
import { ImageView } from "./imageView";

export const setup = () => {
    H5Manager.instance.register("div", Div)
    H5Manager.instance.register("label", Label)
    H5Manager.instance.register("img", ImageView)
}