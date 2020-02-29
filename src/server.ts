import express from "express";

import Logger from './logging/logger';
import ConfigurationProperties from './controllers/CofiguarationProperties';
import route from './controllers/routes';

const app = express();
const logger = new Logger();
process.env.ENVIRONMENT = "DEV";
const config = new ConfigurationProperties(process.env.ENVIRONMENT, process.env.PROPFILE || "./config/dev-config.json");

app.use(express.json());

app.use('/api', route);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    logger.log(`App is listening on port`, port);
    logger.log('App is running in environment', process.env.ENVIRONMENT);
});

export default server;