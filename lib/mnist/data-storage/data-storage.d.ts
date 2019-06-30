export declare class DataStorage {
    private fsPromises;
    private utils;
    getData(path: string, numOfData: any): Promise<{
        input: any;
        output: any;
    }[]>;
}
