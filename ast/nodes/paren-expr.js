"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kind_1 = require("../kind");
var node_1 = require("../node");
var ParenExpr = /** @class */ (function () {
    function ParenExpr() {
        var _this = this;
        this.kind = kind_1.default.ParentExpression;
        this.children = [];
        this.link = new node_1.ASTNodeLink();
        this.hasChildren = function () {
            return _this.children.length != 0;
        };
        this.addChild = function (node) {
            _this.children.push(node);
        };
        this.removeChild = function (index) {
            var oldValue;
            if (index < _this.children.length) {
                oldValue = _this.children[index];
                _this.children.splice(index);
            }
            return oldValue;
        };
        this.print = function (prefix) {
            console.log("".concat(prefix, "("));
        };
        this.run = function () {
            var result = 0;
            for (var _i = 0, _a = _this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                result += child.run();
            }
            return result;
        };
    }
    return ParenExpr;
}());
exports.default = ParenExpr;
