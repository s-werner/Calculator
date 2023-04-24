"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./ast/base");
const lexer_1 = require("./lexer");
const parser_1 = require("./parser");
const exprs = [
    "let varName = \"Hello\"",
    "let varName = ~3*2**6/2",
    "( 2+ 2)",
    "2+3*4/5",
    "2*3+4",
];
for (const expr of exprs) {
    const lexer = new lexer_1.default(expr);
    const tokens = lexer.lex();
    console.log(tokens);
    const parser = new parser_1.default(tokens);
    const ast = new base_1.default();
    parser.parse(ast);
    ast.inOrder();
    console.log(`Final Result: ${ast.run()}`);
}
//# sourceMappingURL=main.js.map