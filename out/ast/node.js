"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTNodeLink = void 0;
class ASTNodeLink {
    parent;
    indexInChildren = -1;
    tree;
    static fromTree(tree) {
        const result = new ASTNodeLink();
        result.setToTree(tree);
        return result;
    }
    static fromParent(parent, index) {
        const result = new ASTNodeLink();
        result.setToParent(parent, index);
        return result;
    }
    update(node) {
        let oldValue;
        if (this.parent) {
            oldValue = this.parent.children[this.indexInChildren];
            this.parent.children[this.indexInChildren] = node;
        }
        else if (this.tree) {
            oldValue = this.tree.root;
            this.tree.root = node;
        }
        return oldValue;
    }
    setToParent(parent, indexInChildren) {
        this.parent = parent;
        this.indexInChildren = indexInChildren;
        this.tree = undefined;
    }
    setToTree(tree) {
        this.tree = tree;
        this.parent = undefined;
        this.indexInChildren = -1;
    }
    removeLink() {
        if (this.parent) {
            this.parent.removeChild(this.indexInChildren);
        }
        else if (this.tree) {
            this.tree.setRoot(null);
        }
    }
}
exports.ASTNodeLink = ASTNodeLink;
//# sourceMappingURL=node.js.map