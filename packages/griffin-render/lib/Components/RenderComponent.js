"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderComponent = /** @class */ (function () {
    function RenderComponent(node) {
        this.$children = [];
        this.$node = node;
        this.$children = node.children.map(function (n) { return new RenderComponent(n); });
    }
    RenderComponent.prototype.$render = function () {
        this.$children.map(function (item) { return item.$render(); });
    };
    return RenderComponent;
}());
exports.RenderComponent = RenderComponent;
