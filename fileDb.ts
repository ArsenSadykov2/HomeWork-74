import {promises as fs} from 'fs';
import {Message, MessageWithoutId} from "./types";
import path from "node:path";

const messagesDirectory = './messages';
const addNewDirMessage = async () => {
    try {
        await fs.access(messagesDirectory);
    } catch {
        await fs.mkdir(messagesDirectory);
    }
};

const fileDb = {
    async init() {
        await addNewDirMessage();
    },
    async getMessageById(dateTime: string): Promise<Message | undefined> {
        try {
            const filePath = path.join(messagesDirectory, `${dateTime}.txt`);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (e) {
            return undefined;
        }
    },
    async getAllMessages() {
        try {
            const files = await fs.readdir(messagesDirectory);
            const messages: Message[] = [];

            for (const file of files) {
                const filePath = path.join(messagesDirectory, file);
                const fileContent = await fs.readFile(filePath, 'utf-8');
                messages.push(JSON.parse(fileContent));
            }

            return messages;
        } catch (e) {
            return [];
        }
    },
    async addNewMessage(message:MessageWithoutId){
        const dateTime = new Date().toISOString();
        const newMessage: Message = { dateTime, ...message };
        const file = path.join(messagesDirectory, `${dateTime}.txt`);

        await fs.writeFile(file, JSON.stringify(newMessage));
        return newMessage;
    },
};

export default fileDb;