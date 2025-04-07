import { LogEntity, LogSeverityLevel } from "../entitites/log.entity";


/* All data sources must implement this */ 
export abstract class LogDataSource{
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<void>;
}