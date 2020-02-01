import express from "express";

import Logger from './controllers/routes.controller';

const app = express();
const logger = new Logger();
app.use(express.json);

const port = process.env.port || 3000;
/**
 * Start Express server.
 */
const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' },
];

app.get("/", (req, res) => {
    //res.send("Server is running!!!!!!!!");
    console.log('Get method called', req);
    res.send(genres);
})

app.post("/", (req, res) => {
    console.log('Post method called', req);
    res.send("Don't play with me.. I will stop responding..");
})

app.put("/", (req, res) => {
    console.log('Put method called', req);
    res.send("Stop playing... This is my final warning...!!!!");
})

app.delete("/", (req, res) => {
    console.log('Delete method called', req);
    res.send("Goto hell.........|........");
})

logger.log();

const server = app.listen(port, () => {
    console.log(`App is running at ${port} mode`);
});

export default server;