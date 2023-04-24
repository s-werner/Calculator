"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
const kind_1 = require("../kind");
const operators_1 = require("../../operators");
class BinaryOperation {
    kind = kind_1.default.BinaryOperation;
    children = [null, null];
    link = new node_1.ASTNodeLink();
    hasChildren = () => {
        return this.left() != null && this.right() != null;
    };
    addChild = (node) => {
        if (this.right() != null) {
            throw "BinaryOperation already has a right node";
        }
        this.setRight(node);
    };
    removeChild = (index) => {
        let oldValue;
        if (index == 0 || index == 1) {
            oldValue = this.children[index];
            this.children[index] = null;
        }
        return oldValue;
    };
    run = () => {
        switch (this.token.op) {
            case operators_1.BinaryOperator.plus:
                return this.left().run() + this.right().run();
            case operators_1.BinaryOperator.minus:
                return this.left().run() - this.right().run();
            case operators_1.BinaryOperator.mult:
                return this.left().run() * this.right().run();
            case operators_1.BinaryOperator.modulo:
                return this.left().run() % this.right().run();
            case operators_1.BinaryOperator.div:
                return this.left().run() / this.right().run();
            case operators_1.BinaryOperator.power:
                return this.left().run() ** this.right().run();
            default:
                throw `Unrecognized BinaryOperator "${this.token.op}" in BinaryOperation.run()`;
        }
    };
    token;
    constructor(token, left, right) {
        this.token = token;
        this.setLeft(left);
        this.setRight(right);
    }
    left() {
        return this.children[0];
    }
    right() {
        return this.children[1];
    }
    setLeft(node) {
        node?.link.removeLink();
        node?.link.setToParent(this, 0);
        this.children[0] = node;
    }
    setRight(node) {
        node?.link.removeLink();
        node?.link.setToParent(this, 1);
        this.children[1] = node;
    }
    print(prefix) {
        console.log(`${prefix} ${this.token.op}\t(Result: ${this.run()})`);
    }
}
exports.default = BinaryOperation;
//# sourceMappingURL=binary-operation.js.map