"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_operation_1 = require("./ast/nodes/binary-operation");
const global_scope_1 = require("./ast/nodes/global-scope");
const integer_literal_1 = require("./ast/nodes/integer-literal");
const paren_expr_1 = require("./ast/nodes/paren-expr");
const unary_operation_1 = require("./ast/nodes/unary-operation");
const variable_decl_1 = require("./ast/nodes/variable-decl");
const keywords_1 = require("./keywords");
const operators_1 = require("./operators");
const token_1 = require("./token");
const string_literal_1 = require("./ast/nodes/string-literal");
class Parser {
    tokens;
    index = -1;
    constructor(tokens) {
        this.tokens = tokens;
    }
    peek(kind) {
        if (this.index + 1 >= this.tokens.length) {
            return null;
        }
        const token = this.tokens[this.index + 1];
        if (kind && token.kind != kind) {
            return null;
        }
        return token;
    }
    rpeek(kind) {
        if (this.index == 0) {
            return null;
        }
        const token = this.tokens[this.index - 1];
        if (kind && token.kind != kind) {
            return null;
        }
        return token;
    }
    current(kind) {
        if (this.index >= this.tokens.length) {
            return null;
        }
        const token = this.tokens[this.index];
        if (kind && token.kind != kind) {
            throw `Expected a ${kind}, got ${token.kind})`;
        }
        return token;
    }
    consume(kind) {
        this.index += 1;
        return this.current(kind);
    }
    parseLHS() {
        let token;
        let root;
        while ((token = this.consume())) {
            switch (token.kind) {
                case token_1.TokenKind.IntegerLiteral:
                    if (root) {
                        root.addChild(new integer_literal_1.default(token));
                        return root;
                    }
                    return new integer_literal_1.default(token);
                case token_1.TokenKind.StringLiteral:
                    if (root) {
                        root.addChild(new string_literal_1.default(token));
                        return root;
                    }
                    return new string_literal_1.default(token);
                case token_1.TokenKind.BinaryOperator:
                    if (token.op == operators_1.BinaryOperator.minus &&
                        this.peek().kind == token_1.TokenKind.IntegerLiteral) {
                        // Remove the minus sign token, and treat the minus-sign +
                        // integer-literal as one token.
                        this.tokens.splice(this.index, 1);
                        const intTok = this.current();
                        intTok.loc = token.loc;
                        intTok.literal *= -1;
                        if (root) {
                            root.addChild(new integer_literal_1.default(intTok));
                        }
                        return root;
                    }
                    throw `Error`;
                case token_1.TokenKind.UnaryOperator:
                    root = new unary_operation_1.default(token);
                    break;
                case token_1.TokenKind.OpenParen: {
                    const parenExpr = new paren_expr_1.default();
                    parenExpr.addChild(this.parseExpression(token_1.TokenKind.ClosedParen));
                    if (root) {
                        root.addChild(parenExpr);
                        return root;
                    }
                    return parenExpr;
                }
                default:
                    throw `Unexpected token: ${token.kind}`;
            }
        }
        return root;
    }
    parseRHSOfExpression(lhs, minPrecedence, endTokenKind) {
        // Not necessarily, but every successive root is a BinaryOperation
        let root = lhs;
        let nextToken = this.peek();
        while (nextToken?.kind == token_1.TokenKind.BinaryOperator) {
            const opTok = this.consume(); // = lookahead
            const opInfo = operators_1.BinOperatorInfoMap.get(opTok.op);
            if (opInfo.precedence < minPrecedence) {
                break;
            }
            let rhs;
            if (opInfo.assoc == operators_1.AssocKind.Right) {
                rhs = this.parseRHSOfExpression(this.parseLHS(), 0, endTokenKind);
            }
            else {
                rhs = this.parseLHS();
            }
            root = new binary_operation_1.default(opTok, root, rhs);
            nextToken = this.peek();
            if (!nextToken) {
                break;
            }
            if (nextToken.kind == endTokenKind) {
                this.consume();
                break;
            }
            let currentOperation = root;
            while (nextToken?.kind == token_1.TokenKind.BinaryOperator) {
                const nextTokenBinInfo = operators_1.BinOperatorInfoMap.get(nextToken.op);
                if (nextTokenBinInfo.precedence <= opInfo.precedence &&
                    (nextTokenBinInfo.assoc != operators_1.AssocKind.Right ||
                        nextTokenBinInfo.precedence != opInfo.precedence)) {
                    break;
                }
                const nextMinPrecedence = nextTokenBinInfo.precedence +
                    (nextTokenBinInfo.assoc != operators_1.AssocKind.Right ? 1 : 0);
                rhs = this.parseRHSOfExpression(rhs, nextMinPrecedence);
                nextToken = this.peek(token_1.TokenKind.BinaryOperator);
                currentOperation.setRight(rhs);
                currentOperation = rhs;
            }
        }
        return root;
    }
    parseExpression(endTokenKind) {
        return this.parseRHSOfExpression(this.parseLHS(), 0, endTokenKind);
    }
    parseVarDecl() {
        const nameToken = this.consume();
        if (!nameToken) {
            throw `Expected an identifier`;
        }
        if (nameToken.kind != token_1.TokenKind.Identifier) {
            if (nameToken.kind == token_1.TokenKind.KeywordIdentifier) {
                throw `${nameToken.keyword} cannot be used as a variable name`;
            }
            throw `Expected an identifier for variable name`;
        }
        const varDecl = new variable_decl_1.default(nameToken);
        const nextToken = this.consume(token_1.TokenKind.Equal);
        varDecl.setExpr(this.parseExpression());
        return varDecl;
    }
    parseStatement() {
        const token = this.peek();
        if (!token) {
            throw `Expected an identifier`;
        }
        switch (token.kind) {
            case token_1.TokenKind.KeywordIdentifier:
                switch (token.keyword) {
                    case keywords_1.KeywordKind.Let:
                        this.consume();
                        return this.parseVarDecl();
                    default:
                        throw `Unrecognized keyword ${token.keyword}`;
                }
            default:
                return this.parseExpression();
        }
    }
    parse(ast) {
        ast.setRoot(new global_scope_1.default());
        ast.root.addChild(this.parseStatement());
        return ast.root;
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map