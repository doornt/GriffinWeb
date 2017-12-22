"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentManager = /** @class */ (function () {
    function ComponentManager() {
        this._registeredClass = {};
    }
    Object.defineProperty(ComponentManager, "instance", {
        get: function () {
            if (!this.$inst) {
                this.$inst = new ComponentManager();
            }
            return this.$inst;
        },
        enumerable: true,
        configurable: true
    });
    ComponentManager.prototype.autoRegister = function (name, ctr) {
        this._registeredClass[name] = ctr;
    };
    return ComponentManager;
}());
exports.ComponentManager = ComponentManager;
