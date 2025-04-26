import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entitites/log.entity";
import { PrismaClient, SeverityLevel} from "../../generated/prisma";

const prismaClient = new PrismaClient;

/* math the level of prisma and LogEntitiy */
const severityEnum={
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}


export class PostgresLogDatasource implements LogDataSource{
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await prismaClient.logModel.create({
            data:{
                level: severityEnum[log.level] ,
                message: log.message,
                origin: log.origin
            }
        });
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const dbLogs = await prismaClient.logModel.findMany({
            where:{level}
        });

        return dbLogs.map(LogEntity.fromObject);
    }

}