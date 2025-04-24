import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entitites/log.entity";
import fs from 'fs';


export class FileSystemsDatasource implements LogDataSource{

    private readonly logPath ='logs/';
    private readonly allLogsPath ='logs/logs-low.log';
    private readonly mediumLogsPath ='logs/logs-medium.log';
    private readonly highLogsPath ='logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    /* Function for create the files if not exist*/
    private createLogsFiles = ()=>{
        if( !fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        }

       [this.allLogsPath,this.mediumLogsPath,this.highLogsPath].forEach(
            path =>{
                if (fs.existsSync(path)) return;
                fs.writeFileSync(path,'');
            }
       )

    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify(newLog)}\n`;
        /*This just adds a new line at the end of the file without reading it as json */
        fs.appendFileSync(this.allLogsPath, logAsJson);

        if (newLog.level == LogSeverityLevel.low) return;
        if (newLog.level == LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else{
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    }


    private getLogsFromFile =(path: string): LogEntity[]=>{
        const content = fs.readFileSync(path,'utf-8');

        if (content==='') return []; // we avoid to call fromJson with empty string that will crash the app
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log));
        return logs;

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch(severityLevel){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${LogSeverityLevel} not implemented`);
        }
    }

}
