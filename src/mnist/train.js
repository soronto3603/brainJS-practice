const brain = require("brain.js");
const fs = require("fs");
const papa = require("papaparse");

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

// 0 : label
// 1~785 : pixel
const unParsedTrainData = fs.readFileSync("./data/mnist/mnist_train.csv","utf8");
let trainCSVData = papa.parse(unParsedTrainData).data.slice(0,200);

const trainData = [];

// standardization
let local_max = 0;
for(var i=0;i<trainCSVData.length;i++){
    const noneZeroValues=trainCSVData[i].filter((x)=>x!=0)
    for(var j=0;j<noneZeroValues.length;j++){
        if(noneZeroValues[j]*1>local_max*1)local_max=noneZeroValues[j];
    }
}

console.log(trainCSVData);

for(var i=0;i<trainCSVData.length;i++){
    trainData.push({
        input:trainCSVData[i].slice(1,785).map((x)=>{return Number(x)/local_max}),
        output: one_hot(trainCSVData[i].slice(0,1)).map((x)=>{return Number(x)})
    })
    if(100<i) break;
}

console.log("data slicing complete.");


const config = {
    inputSize: 784,
    // hiddenLayers: [784,1568,2356],
    hiddenLayers: [784,256],
    outputSize: 10,
    activation: 'sigmoid',
    leakyReluAlpha: 0.01
};

console.log(config);
console.log('running start')
const net = new brain.NeuralNetwork(config);

net.train(trainData,{
    iterations: 2000,
    log: true,
    logPeriod: 10
});

const timestamp = new Date().getTime().toString();
const json = JSON.stringify(net.toJSON());

fs.open("./weights/mnist"+timestamp+"weights.json","w",()=>{
    fs.writeFile("./weights/mnist/"+timestamp+"weights.json",json,()=>{});
});
// console.log(JSON.stringify(trainData[0].input));
// const output = net.run(testData[0].input)
// console.log(max_index_of(output,output[0]))


