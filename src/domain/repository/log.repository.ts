import { LogDataSource } from "../datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../entitites/log.entity";



export abstract class LogRepository {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<void>;
}