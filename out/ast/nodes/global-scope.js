"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kind_1 = require("../kind");
const node_1 = require("../node");
class GlobalScope {
    kind = kind_1.default.ParentExpression;
    children = [];
    link = new node_1.ASTNodeLink();
    hasChildren = () => {
        return this.children.length != 0;
    };
    addChild = (child) => {
        this.children.push(child);
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
        console.log(`${prefix}GlobalScope`);
    };
    run = () => {
        let result = 0;
        for (let child of this.children) {
            result += child.run();
        }
        return result;
    };
}
exports.default = GlobalScope;
//# sourceMappingURL=global-scope.js.map