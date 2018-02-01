import { RenderComponent, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";

export class Div extends RenderComponent {

    constructor(tag:string,attrs: any, styles) {
        super(tag,attrs, styles)
    }
}