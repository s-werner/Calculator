"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keywords_1 = require("./keywords");
const token_1 = require("./token");
const spaces = [" ", "\n", "\t", "\r", "\f"];
class Lexer {
    expr;
    index = -1;
    tokens = [];
    constructor(expr) {
        this.expr = expr;
    }
    rpeek() {
        if (this.index == 0) {
            return undefined;
        }
        return this.expr[this.index - 1];
    }
    peek() {
        if (this.index + 1 >= this.expr.length) {
            return undefined;
        }
        return this.expr[this.index + 1];
    }
    consume(amount = 1) {
        this.index += amount;
        if (this.index >= this.expr.length) {
            return undefined;
        }
        return this.expr[this.index];
    }
    todigit(char, base) {
        switch (true) {
            case char >= "0" && char <= "9": {
                const digit = char.charCodeAt(0) - "0".charCodeAt(0);
                if (digit >= base) {
                    throw `Invalid digit ${digit} for number with base ${base}`;
                }
                return digit;
            }
            case char >= "a" && char <= "z": {
                const digit = 10 + (char.charCodeAt(0) - "a".charCodeAt(0));
                if (digit >= base) {
                    throw `Invalid character ${digit} for number with base ${base}`;
                }
                return digit;
            }
            case char >= "A" && char <= "Z": {
                const digit = 10 + (char.charCodeAt(0) - "A".charCodeAt(0));
                if (digit >= base) {
                    throw `Invalid character ${digit} for number with base ${base}`;
                }
                return digit;
            }
        }
        return undefined;
    }
    readString(firstChar) {
        let char = this.consume();
        let newString = "";
        while (char != "\"") {
            newString += char;
            char = this.consume();
        }
        return newString;
    }
    readNumber(firstChar) {
        let char = firstChar;
        let base = 10;
        if (firstChar == "0") {
            const char = this.peek();
            switch (char) {
                case "b":
                case "B":
                    base = 2;
                    firstChar = this.consume(2);
                    break;
                case "o":
                case "O":
                    base = 8;
                    firstChar = this.consume(2);
                    break;
                case "x":
                case "X":
                    base = 16;
                    firstChar = this.consume(2);
                    break;
            }
        }
        let number = this.todigit(firstChar, base);
        while ((char = this.peek())) {
            const digit = this.todigit(char, base);
            if (digit == undefined) {
                return number;
            }
            if (digit >= base) {
                throw `Invalid character ${digit} for base ${base}`;
            }
            this.consume();
            number *= base;
            number += digit;
        }
        return number;
    }
    readIdentifier() {
        let start = this.index;
        let end = start + 1;
        let token = this.peek();
        while ((token = this.peek())) {
            if ((token[0] >= "a" && token[0] <= "z") ||
                (token[0] >= "A" && token[0] <= "Z") ||
                (token[0] >= "0" && token[0] <= "9") ||
                token == "_") {
                this.consume();
                end += 1;
                continue;
            }
            break;
        }
        return this.expr.substring(start, end);
    }
    isdigit(str) {
        return str[0] >= "0" && str[0] <= "9";
    }
    handleBinOp(op) {
        this.tokens.push({
            kind: token_1.TokenKind.BinaryOperator,
            op: op,
            loc: this.index,
        });
    }
    lex() {
        let char = undefined;
        while ((char = this.consume())) {
            switch (true) {
                case spaces.includes(char):
                    continue;
                case this.isdigit(char):
                    this.tokens.push({
                        kind: token_1.TokenKind.IntegerLiteral,
                        literal: this.readNumber(char),
                        loc: this.index,
                    });
                    break;
                case char == "\"":
                    this.tokens.push({
                        kind: token_1.TokenKind.StringLiteral,
                        literal: this.readString(char),
                        loc: this.index
                    });
                    break;
                case char == "*":
                    if (this.peek() == "*") {
                        this.consume();
                        this.handleBinOp("**");
                    }
                    else {
                        this.handleBinOp(char);
                    }
                    break;
                case char == "-":
                case char == "+":
                case char == "%":
                case char == "/":
                    this.handleBinOp(char);
                    break;
                case char == "!":
                case char == "~":
                    this.tokens.push({
                        kind: token_1.TokenKind.UnaryOperator,
                        op: char,
                        loc: this.index,
                    });
                    break;
                case char == "=":
                    this.tokens.push({
                        kind: token_1.TokenKind.Equal,
                        loc: this.index,
                    });
                    break;
                case char == "(":
                    this.tokens.push({
                        kind: token_1.TokenKind.OpenParen,
                        loc: this.index,
                    });
                    break;
                case char == ")":
                    this.tokens.push({
                        kind: token_1.TokenKind.ClosedParen,
                        loc: this.index,
                    });
                    break;
                case char == ";":
                    this.tokens.push({
                        kind: token_1.TokenKind.EndLine,
                        loc: this.index,
                    });
                    break;
                case char >= "a" && char <= "z":
                case char >= "A" && char <= "Z": {
                    const identifier = this.readIdentifier();
                    if (Object.values(keywords_1.KeywordKind).includes(identifier)) {
                        this.tokens.push({
                            kind: token_1.TokenKind.KeywordIdentifier,
                            loc: this.index,
                            keyword: identifier,
                        });
                    }
                    else {
                        this.tokens.push({
                            kind: token_1.TokenKind.Identifier,
                            loc: this.index,
                            name: identifier,
                        });
                    }
                    break;
                }
                default:
                    throw `Not an allowed character ${char}`;
            }
        }
        return this.tokens;
    }
}
exports.default = Lexer;
//# sourceMappingURL=lexer.js.map