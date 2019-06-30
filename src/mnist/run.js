const brain = require("brain.js");
const fs = require("fs");
const papa = require("papaparse");
const chalk = require("chalk");

function one_hot(d){
    const array = [0,0,0,0,0,0,0,0,0,0];
    array[d]=1;
    return array;
}

function max_index_of(d) {
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
function draw_mnist(d) {
    let buffer = "";
    for(var i=0;i<28;i++){
        for(var j=0;j<28;j++){
            buffer += chalk.bgRgb(d[i*28+j]*256,d[i*28+j]*256,d[i*28+j]*256)(" ");
        }
        console.log(buffer);
        buffer = "";
    }
}
const unParsedTestData = fs.readFileSync("./data/mnist/mnist_test.csv","utf8");
const testCSVData = papa.parse(unParsedTestData).data;

const testData = [];
for(var i=0;i<testCSVData.length;i++){
    testData.push({
        input:testCSVData[i].slice(1,785).map((x)=>{return Number(x)/256}),
        output: one_hot(testCSVData[i].slice(0,1).map((x)=>{return Number(x)}))
    })
}

const rawJson = fs.readFileSync("./weights/mnist/1561735999247weights.json");
const json = JSON.parse(rawJson);
const net = new brain.NeuralNetwork();
net.fromJSON(json);


// console.log(draw_mnist(testData[0].input));
// const output = net.run(testData[0].input);
// console.log(max_index_of(output));

let totalCount = 0;
let correctCount = 0;
for(var i=0;i<320;i++){
    let index = Math.floor(Math.random() * (testData.length+1));
    try{
        draw_mnist(testData[index].input);
        const output = net.run(testData[index].input);
        totalCount+=1;
        if(max_index_of(testData[index].output) == max_index_of(output))correctCount+=1;
        console.log("predict : ",max_index_of(output));
        console.log("----------------------------------");
    }catch{
    }
}
console.log(correctCount,totalCount);
console.log("accuracy : ",correctCount/totalCount)