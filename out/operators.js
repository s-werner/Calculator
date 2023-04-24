"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinOperatorInfoMap = exports.BinOperatorInfo = exports.AssocKind = exports.UnaryOperator = exports.BinaryOperator = void 0;
var BinaryOperator;
(function (BinaryOperator) {
    BinaryOperator["plus"] = "+";
    BinaryOperator["minus"] = "-";
    BinaryOperator["mult"] = "*";
    BinaryOperator["modulo"] = "%";
    BinaryOperator["div"] = "/";
    BinaryOperator["power"] = "**";
})(BinaryOperator = exports.BinaryOperator || (exports.BinaryOperator = {}));
var UnaryOperator;
(function (UnaryOperator) {
    UnaryOperator["BoolNot"] = "!";
    UnaryOperator["Invert"] = "~";
    // Negation = "-" handled as BinaryOperator.minus
})(UnaryOperator = exports.UnaryOperator || (exports.UnaryOperator = {}));
var AssocKind;
(function (AssocKind) {
    AssocKind[AssocKind["Left"] = 0] = "Left";
    AssocKind[AssocKind["Right"] = 1] = "Right";
})(AssocKind = exports.AssocKind || (exports.AssocKind = {}));
class BinOperatorInfo {
    assoc;
    precedence;
}
exports.BinOperatorInfo = BinOperatorInfo;
exports.BinOperatorInfoMap = new Map([
    [BinaryOperator.plus, { assoc: AssocKind.Left, precedence: 0 }],
    [BinaryOperator.minus, { assoc: AssocKind.Left, precedence: 0 }],
    [BinaryOperator.mult, { assoc: AssocKind.Left, precedence: 1 }],
    [BinaryOperator.modulo, { assoc: AssocKind.Left, precedence: 1 }],
    [BinaryOperator.div, { assoc: AssocKind.Left, precedence: 1 }],
    [BinaryOperator.power, { assoc: AssocKind.Right, precedence: 2 }],
]);
//# sourceMappingURL=operators.js.map