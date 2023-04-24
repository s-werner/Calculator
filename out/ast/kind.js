"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ASTNodeKind;
(function (ASTNodeKind) {
    ASTNodeKind["GlobalScope"] = "global-scope";
    ASTNodeKind["IntegerLiteral"] = "integer-literal";
    ASTNodeKind["StringLiteral"] = "string-literal";
    ASTNodeKind["BinaryOperation"] = "binary-operation";
    ASTNodeKind["UnaryOperator"] = "unary-operator";
    ASTNodeKind["ParentExpression"] = "paren-expression";
    ASTNodeKind["VariableDecl"] = "variable-decl";
})(ASTNodeKind || (ASTNodeKind = {}));
exports.default = ASTNodeKind;
//# sourceMappingURL=kind.js.map