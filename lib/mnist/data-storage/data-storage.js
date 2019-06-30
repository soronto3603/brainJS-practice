"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const utils_1 = require("./utils");
class DataStorage {
    constructor() {
        this.fsPromises = fs_1.fs.promises;
        this.utils = new utils_1.Utils();
    }
    async getData(path, numOfData) {
        const rawCSV = await this.fsPromises.readFile(path);
        const parsedCSVData = papa.parsed(rawCSV).data;
        const data = [];
        for (var i = 0; i < parsedCSVData.lenth && i < numOfData; i++) {
            data.push({
                input: parsedCSVData[i].slice(1, 785).map((x) => { return Number(x) / 256; }),
                output: this.utils.one_hot(parsedCSVData[i].slice(0, 1).map((x) => { return Number(x) / 256; }))
            });
        }
        return data;
    }
}
exports.DataStorage = DataStorage;
//# sourceMappingURL=data-storage.js.map