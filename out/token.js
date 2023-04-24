"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenKind = void 0;
var TokenKind;
(function (TokenKind) {
    TokenKind["IntegerLiteral"] = "integer-literal";
    TokenKind["StringLiteral"] = "string-literal";
    TokenKind["BinaryOperator"] = "binary-operator";
    TokenKind["UnaryOperator"] = "unary-operator";
    TokenKind["OpenParen"] = "open-parenthesis";
    TokenKind["ClosedParen"] = "close-parenthesis";
    TokenKind["KeywordIdentifier"] = "KeywordIdentifier";
    TokenKind["Identifier"] = "identifier";
    TokenKind["Equal"] = "equal-sign";
    TokenKind["EndLine"] = "end-line";
})(TokenKind = exports.TokenKind || (exports.TokenKind = {}));
//# sourceMappingURL=token.js.map