export default class Logger {

    enableDebugger: boolean = true;

     constructor(message?: string, err?: any) {
         //super();
         if (message !== null && message !== undefined && message !== '')
             this.log(message, err);
     }

    log(message: string, error: any) {
        if (this.enableDebugger) {
            console.log(message, " : ", error);
        }
    }

    debuggerEnabled(enable: boolean) {
        this.enableDebugger = enable;
    }
}