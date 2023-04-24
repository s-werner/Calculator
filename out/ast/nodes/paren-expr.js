"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kind_1 = require("../kind");
const node_1 = require("../node");
class ParenExpr {
    kind = kind_1.default.ParentExpression;
    children = [];
    link = new node_1.ASTNodeLink();
    hasChildren = () => {
        return this.children.length != 0;
    };
    addChild = (node) => {
        this.children.push(node);
    };
    removeChild = (index) => {
        let oldValue;
        if (index < this.children.length) {
            oldValue = this.children[index];
            this.children.splice(index, 1);
        }
        return oldValue;
    };
    print = (prefix) => {
        console.log(`${prefix}(`);
    };
    run = () => {
        let result = 0;
        for (let child of this.children) {
            result += child.run();
        }
        return result;
    };
}
exports.default = ParenExpr;
//# sourceMappingURL=paren-expr.js.map