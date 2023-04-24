"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kind_1 = require("../kind");
const node_1 = require("../node");
class StringLiteral {
    kind = kind_1.default.StringLiteral;
    children;
    link = new node_1.ASTNodeLink();
    hasChildren = () => {
        return false;
    };
    addChild = () => {
        throw "Can't add child to StringLiteral";
    };
    removeChild = () => {
        return undefined;
    };
    run = () => {
        return this.token.literal;
    };
    token;
    constructor(token) {
        this.token = token;
    }
    print(prefix) {
        console.log(`${prefix}${this.token.literal}`);
    }
}
exports.default = StringLiteral;
//# sourceMappingURL=string-literal.js.map