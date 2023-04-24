"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
const kind_1 = require("../kind");
class VariableDecl {
    kind = kind_1.default.VariableDecl;
    children = [null];
    link = new node_1.ASTNodeLink();
    hasChildren = () => {
        return this.expr() != null;
    };
    addChild = (expr) => {
        if (this.expr() != null) {
            throw "VariableDecl already has an expression";
        }
        this.setExpr(expr);
    };
    removeChild = () => {
        let oldValue = this.children[0];
        this.children[0] = null;
        return oldValue;
    };
    expr = () => {
        return this.children[0];
    };
    setExpr = (node) => {
        node?.link.removeLink();
        node?.link.setToParent(this, 0);
        this.children[0] = node;
    };
    run = () => {
        return this.expr()?.run();
    };
    nameToken;
    constructor(name) {
        this.nameToken = name;
    }
    print(prefix) {
        console.log(`${prefix}VarDecl\t("${this.nameToken.name}")`);
    }
}
exports.default = VariableDecl;
//# sourceMappingURL=variable-decl.js.map