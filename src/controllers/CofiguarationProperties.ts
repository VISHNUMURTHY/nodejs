import path from "path";
import fs from "fs";

import Logger from '../logging/logger';

export default class CofiguarationProperties {

   file: string;
   logger: Logger;
   environment: string;
   isConfigured: boolean;

   public constructor(env: string, fileName: string) {
      this.logger = new Logger();
      this.file = path.resolve(fileName);
      this.getEnvironment(env);
      this.isConfigured = this.readProperties(this.file) || false;
   }

   readProperties(filePath?: string): boolean {
      let readFile = filePath || this.file;
      let propObject: any = {};
      try {
         let data = fs.readFileSync(readFile, 'utf8');
         //console.log(Buffer.from(data, 'base64').toString('utf8'));
         propObject = JSON.parse(data);
         //let keys = Object.keys(JSON.parse(data));
      } catch (err) {
         throw this.logger.log('Property File Reading Error', err);
      }
      if (process.env.ENVIRONMENT === propObject["ENVIRONMENT"]) {
         for (let key in propObject) {
            if (propObject.hasOwnProperty(key)) {
               let property = propObject[key];
               process.env[key] = property;
            }
         }
      } else {
         throw this.logger.log('Environment in Property File must match with process.env.ENVIRONMENT. Environment in Propety file ' + readFile + ' is', propObject["ENVIRONMENT"]);
      }
      return true;
   }

   getEnvironment(env: string): string {
      if (env === null || env === undefined || env === "" || env === '' || env.length === 0) {
         throw this.logger.log('Environment variable is Mandatory to Read Property File. Environment variable value is', process.env.ENVIRONMENT);
      } else {
         this.environment = env;
      }
      return this.environment;
   }

   checkConfiguration() {
      return this.isConfigured;
   }
}