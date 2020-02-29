import express from "express";

import Logger from '../logging/logger';

const app = express.Router();

const logger = new Logger();

app.get("/", (req, res) => {
    logger.log('Get method called', "Request arrived");
    res.send("Started to play.");
})

app.post("/", (req, res) => {
    logger.enableDebugger=false;
    logger.log('Post method called', "Request arrived");
    res.send("Don't play with me.. I will stop responding..");
})

app.put("/", (req, res) => {
    logger.enableDebugger=true;
    logger.log('Put method called', "Request arrived");
    res.send("Stop playing... This is my final warning...!!!!");
})

app.delete("/", (req, res) => {
    logger.log('Delete method called', "Request arrived");
    res.send("Goto hell.........|........");
})

export default app;