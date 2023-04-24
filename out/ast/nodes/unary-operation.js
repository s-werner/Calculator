"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("../../operators");
const kind_1 = require("../kind");
const node_1 = require("../node");
class UnaryOperation {
    kind = kind_1.default.UnaryOperator;
    children = [null];
    link = new node_1.ASTNodeLink();
    hasChildren = () => {
        return this.child() != null;
    };
    addChild = (node) => {
        if (this.child() != null) {
            throw "UnaryOperation already has a child";
        }
        this.children[0] = node;
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
            case operators_1.UnaryOperator.BoolNot:
                return !this.child().run();
            case operators_1.UnaryOperator.Invert:
                return ~this.child().run();
            default:
                throw `Unrecognized UnaryOperator "${this.token.op}" in UnaryOperation.run()`;
        }
    };
    token;
    constructor(token, child) {
        this.token = token;
        this.setChild(child);
    }
    child() {
        return this.children[0];
    }
    setChild(node) {
        node?.link.removeLink();
        node?.link.setToParent(this, 0);
        this.children[0] = node;
    }
    print(prefix) {
        console.log(`${prefix} ${this.token.op}\t(Result: ${this.run()})`);
    }
}
exports.default = UnaryOperation;
//# sourceMappingURL=unary-operation.js.map