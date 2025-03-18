import {promises as fs} from 'fs';

const path = '../messages';

const run = async () => {
    const files = await fs.readdir(path);
    files.forEach((file) => {

        console.log(path + '/' + file);
    });
};

run().catch(console.error);