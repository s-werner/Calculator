"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kind_1 = require("../kind");
var node_1 = require("../node");
var IntegerLiteral = /** @class */ (function () {
    function IntegerLiteral(token) {
        var _this = this;
        this.kind = kind_1.default.IntegerLiteral;
        this.link = new node_1.ASTNodeLink();
        this.hasChildren = function () {
            return false;
        };
        this.addChild = function () {
            throw "Can't add child to IntegerLiteral";
        };
        this.removeChild = function (index) {
            return undefined;
        };
        this.run = function () {
            return _this.token.literal;
        };
        this.token = token;
    }
    IntegerLiteral.prototype.print = function (prefix) {
        console.log("".concat(prefix).concat(this.token.literal));
    };
    return IntegerLiteral;
}());
exports.default = IntegerLiteral;
