"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AST {
    root;
    getSpaceString(spaces) {
        let spaceString = "";
        for (let i = 0; i != spaces; i++) {
            spaceString += " ";
        }
        return spaceString;
    }
    in(node, spaces, tab) {
        node.print(this.getSpaceString(spaces));
        if (!node.hasChildren()) {
            return;
        }
        for (const child of node.children) {
            this.in(child, spaces + tab, tab);
        }
    }
    inOrder(tab = 4) {
        if (this.root) {
            this.in(this.root, 0, tab);
        }
    }
    setRoot(root) {
        this.root = root;
        if (this.root) {
            this.root.link.removeLink();
            this.root.link.setToTree(this);
        }
    }
    run() {
        return this.root?.run();
    }
}
exports.default = AST;
//# sourceMappingURL=base.js.map