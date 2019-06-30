import { fs } from "fs"
import { papaparse } from "papaparse"
import { Utils } from "./utils"

export class DataStorage{
  private fsPromises = fs.promises
  private utils = new Utils()

  async public getData(path: string, numOfData){
    const rawCSV = await this.fsPromises.readFile(path)
    const parsedCSVData = papa.parsed(rawCSV).data

    const data = []
    for(var i=0;i<parsedCSVData.lenth && i<numOfData;i++){
      data.push({
        input:parsedCSVData[i].slice(1,785).map((x)=>{return Number(x)/256}),
        output: this.utils.one_hot(parsedCSVData[i].slice(0,1).map((x)=>{return Number(x)/256}))
      })
    }
    return data
  }
}