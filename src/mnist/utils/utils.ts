import chalk from "chalk"

export class Utils{
  public one_hot(d:any){
    const array = [0,0,0,0,0,0,0,0,0,0];
    array[d]=1;
    return array;
  }
  
  public max_index_of(d:any) {
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
  public draw_mnist(d:any) {
    let buffer = "";
    for(var i=0;i<28;i++){
        for(var j=0;j<28;j++){
            buffer += chalk.bgRgb(d[i*28+j]*256,d[i*28+j]*256,d[i*28+j]*256).bold(" ");
        }
        console.log(buffer);
        buffer = "";
    }
  }
}