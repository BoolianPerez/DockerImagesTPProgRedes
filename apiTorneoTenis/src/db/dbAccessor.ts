import errors from '@src/constants/Errors';
import { error } from 'console';
import * as fs from 'fs';
import logger from 'jet-logger';

class Accessor<T extends dataObject> {
    database_dir: string;
    constructor(database_dir: string) {
        this.database_dir = database_dir
    }

    private readData(filePath: string): T[] {
        try {
            const data = fs.readFileSync(this.database_dir + filePath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            throw error(errors.MISSINGDBERROR())
        }
    }

    private writeData(data: T[], filePath: string): void {   
        if (!fs.existsSync(this.database_dir + filePath)){
            throw error(errors.MISSINGDBERROR())
        }
        fs.writeFileSync(this.database_dir + filePath, JSON.stringify(data, null, 2));
    }

    private generateNewId(filePath: string): number{
        const data = this.readData(filePath);
        let id = data.length
        while(this.persists(id, filePath)){
            id = id + 1
        }
        return id
    }

    persists(id: number, filePath: string): boolean{
        const data = this.readData(filePath);

        return (data.findIndex((item: any) => item.id === id)) !== -1;
    }

    getOne(id: number, filePath: string): T | undefined {
        const data = this.readData(filePath);
        return data.find((item: any) => item.id === id);
    }

    getAll(filePath: string): T[] {
        return this.readData(filePath);
    }

    add(item: T, filePath: string): T | boolean {
        const data = this.getAll(filePath)
        item.id = this.generateNewId(filePath)

        data.push(item);
        this.writeData(data, filePath);

        const newData = this.readData(filePath);
        const addedItem = newData.find((newItem: any) => newItem.id === item.id);
        return addedItem ? addedItem : false;
    }

    update(updatedItem: T, filePath: string): boolean {
        const data = this.readData(filePath);
        
        const index = data.findIndex((item: any) => item.id === updatedItem.id);
        if (index !== -1) {
            data[index] = updatedItem;
            this.writeData(data, filePath);
            return true; 
        }
        return false;
    }

    delete_(id: number, filePath: string): boolean {
        const data = this.readData(filePath);
        const ogLength = data.length
        
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            data.splice(index, 1);
        } else {
            return false;
        }

        if (data.length !== ogLength) {
            this.writeData(data, filePath);
            return true; 
        }
        return false; 
    }
}

export default Accessor;