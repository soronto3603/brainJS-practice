"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const brain_js_1 = __importDefault(require("brain.js"));
const config = {
    hiddenLayers: [3],
    activation: 'sigmoid'
};
const net = new brain_js_1.default.NeuralNetwork(config);
net.train([{ input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }]);
console.log(net.run([0, 0]));
console.log(net.run([1, 0]));
console.log(net.run([0, 1]));
console.log(net.run([1, 1]));
//# sourceMappingURL=main.js.map