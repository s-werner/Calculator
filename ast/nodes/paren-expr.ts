import ASTNodeKind from "../kind";
import ASTNode, { ASTNodeLink } from "../node";

export default class ParenExpr implements ASTNode {
  readonly kind = ASTNodeKind.ParentExpression;
  children: ASTNode[] = [];
  link: ASTNodeLink = new ASTNodeLink();

  hasChildren = () => {
    return this.children.length != 0;
  };

  addChild = (node: ASTNode) => {
    this.children.push(node);
  };

  removeChild = (index: number): ASTNode | undefined => {
    let oldValue: ASTNode | undefined;
    if (index < this.children.length) {
      oldValue = this.children[index];
      this.children.splice(index, 1);
    }

    return oldValue;
  };

  print = (prefix: string) => {
    console.log(`${prefix}(`);
  };

  run = () => {
    let result = 0;
    for (let child of this.children) {
      result += child.run() as number;
    }

    return result;
  };
}
