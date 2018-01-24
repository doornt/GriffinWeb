import { ComponentManager } from "../Manager/ComponentManager";
import { Div } from "./div";
import { Label } from "./label";
import { ImageView } from "./imageView";

export const setup = () => {
    ComponentManager.instance.register("div", Div)
    ComponentManager.instance.register("label", Label)
    ComponentManager.instance.register("text", Label)
    ComponentManager.instance.register("img", ImageView)
}