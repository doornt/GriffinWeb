"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderComponent_1 = require("./RenderComponent");
var ComponentManager_1 = require("../Manager/ComponentManager");
var BaseComponent = /** @class */ (function () {
    function BaseComponent(pugJson) {
        this.$nodes = [];
        this.$renders = [];
        ComponentManager_1.ComponentManager.instance.autoRegister(this.constructor.name, this.constructor);
        this.$nodes = pugJson;
        this.init();
        this.viewDidLoad();
    }
    BaseComponent.prototype.init = function () {
        this.$renders = this.$nodes.map(function (node) {
            return new RenderComponent_1.RenderComponent(node);
        });
    };
    BaseComponent.prototype.viewDidLoad = function () {
        this.$renders.map(function (item) { return item.$render(); });
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
