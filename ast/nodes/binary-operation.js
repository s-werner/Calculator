"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("../node");
var kind_1 = require("../kind");
var binary_operator_1 = require("../../binary-operator");
var BinaryOperation = /** @class */ (function () {
    function BinaryOperation(token) {
        var _this = this;
        this.kind = kind_1.default.BinaryOperation;
        this.children = [null, null];
        this.link = new node_1.ASTNodeLink();
        this.hasChildren = function () {
            return _this.left() != null && _this.right() != null;
        };
        this.addChild = function (node) {
            if (_this.right() != null) {
                throw "BinaryOperation already has a right node";
            }
            _this.setRight(node);
        };
        this.removeChild = function (index) {
            var oldValue;
            if (index == 0 || index == 1) {
                oldValue = _this.children[index];
                _this.children[index] = null;
            }
            return oldValue;
        };
        this.run = function () {
            switch (_this.token.op) {
                case binary_operator_1.default.plus:
                    return _this.left().run() + _this.right().run();
                case binary_operator_1.default.minus:
                    return _this.left().run() - _this.right().run();
                case binary_operator_1.default.mult:
                    return _this.left().run() * _this.right().run();
                case binary_operator_1.default.modulo:
                    return _this.left().run() % _this.right().run();
                case binary_operator_1.default.div:
                    return _this.left().run() / _this.right().run();
                case binary_operator_1.default.power:
                    return Math.pow(_this.left().run(), _this.right().run());
                default:
                    throw "Unrecognized BinaryOperator \"".concat(_this.token.op, "\" in BinaryOperation.run()");
            }
        };
        this.token = token;
    }
    BinaryOperation.prototype.left = function () {
        return this.children[0];
    };
    BinaryOperation.prototype.right = function () {
        return this.children[1];
    };
    BinaryOperation.prototype.setLeft = function (node) {
        node === null || node === void 0 ? void 0 : node.link.removeLink();
        node === null || node === void 0 ? void 0 : node.link.setToParent(node, 0);
        this.children[0] = node;
    };
    BinaryOperation.prototype.setRight = function (node) {
        node === null || node === void 0 ? void 0 : node.link.removeLink();
        node === null || node === void 0 ? void 0 : node.link.setToParent(node, 1);
        this.children[1] = node;
    };
    BinaryOperation.prototype.print = function (prefix) {
        console.log("".concat(prefix, " ").concat(this.token.op, "\t(Result: ").concat(this.run(), ")"));
    };
    return BinaryOperation;
}());
exports.default = BinaryOperation;
