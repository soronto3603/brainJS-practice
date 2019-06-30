"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Utils {
    one_hot(d) {
        const array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        array[d] = 1;
        return array;
    }
    max_index_of(d) {
        var max = d[0];
        var maxIndex = 0;
        for (var i = 1; i < d.length; i++) {
            if (d[i] > max) {
                maxIndex = i;
                max = d[i];
            }
        }
        return maxIndex;
    }
    draw_mnist(d) {
        let buffer = "";
        for (var i = 0; i < 28; i++) {
            for (var j = 0; j < 28; j++) {
                buffer += chalk_1.default.bgRgb(d[i * 28 + j] * 256, d[i * 28 + j] * 256, d[i * 28 + j] * 256).bold(" ");
            }
            console.log(buffer);
            buffer = "";
        }
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map