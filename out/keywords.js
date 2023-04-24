"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordToLexemeMap = exports.KeywordKind = void 0;
var KeywordKind;
(function (KeywordKind) {
    KeywordKind["Let"] = "let";
})(KeywordKind = exports.KeywordKind || (exports.KeywordKind = {}));
exports.KeywordToLexemeMap = new Map([
    [KeywordKind.Let, "let"],
]);
//# sourceMappingURL=keywords.js.map