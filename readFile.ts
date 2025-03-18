import {promises as fs} from 'fs';

const fileName = './test.json';

interface FileContent {
    message: string;
}

const run = async () => {
    try{
        const fileContent = await fs.readFile(fileName);
        const result = JSON.parse(fileContent.toString()) as FileContent;
    }catch(err){
        console.log(err);
    }
};

run().catch(console.error);