import {promises as fs} from 'fs';
import {Message, MessageWithoutId} from "./types";
import {existsSync} from "node:fs";

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
    async init() {
        try{
            if(!existsSync(fileName)){
               await fs.writeFile(fileName, JSON.stringify([]));
            } else {
                const fileContent = await fs.readFile(fileName);
                data = JSON.parse(fileContent.toString()) as Message[];
            }
        } catch (e){
            data = [];
            console.log(e);
        }
    },
    async getMessageById(dateTime: string) {
        return data.find(m => m.dateTime === dateTime);
    },
    async getAllMessages() {
        return data;
    },
    async addNewMessage(message:MessageWithoutId){
        const dateTime = new Date().toISOString();
        const newMessage = {dateTime, ...message};
        data.push(newMessage);
        await this.save();
        return newMessage;
    },
    async save () {
        return fs.writeFile(fileName, JSON.stringify(data));
    },
};

export default fileDb;