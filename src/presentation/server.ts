import {CronService} from "./cron/cron-service";
import {CheckService} from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemsDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/emails/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";


const fileLogRepository = new LogRepositoryImpl(
    new FileSystemsDatasource()
);
const mongologRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);
const emailService = new EmailService();

export class Server {

    public static start(port: number) {

        console.log('Server started....');
        
        // Send email
        //new SendEmailLogs(emailService,logRepository).execute(['ml@gmail.com','ml@hotmail.com'])
    
        /** Here we make the timer job */
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckServiceMultiple(
                    [fileLogRepository,mongologRepository,postgresLogRepository],
                    () => console.log('success'),
                    () => console.log('error in service'),
                ).execute('https://google.com');
            });
    }
}