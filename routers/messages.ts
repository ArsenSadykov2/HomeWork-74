import express from "express";
import fileDb from "../fileDb";
import {MessageWithoutId} from "../types";

const messageRouter = express.Router();

messageRouter.get('/', async (req, res) => {
    const messages = await fileDb.getAllMessages()
    res.send(messages);
});

messageRouter.post('/',async (req, res) => {
    const newMessage: MessageWithoutId = {
        message: req.body.message,
    };

    const savedMessage = await fileDb.addNewMessage(newMessage);

    res.send(savedMessage);
});

export default messageRouter;