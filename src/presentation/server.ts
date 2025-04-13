import {CronService} from "./cron/cron-service";
import {CheckService} from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemsDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemsDatasource()
);

export class Server {

    public static start(port: number) {

        console.log('Server started....');
        
        // Send email

        const emailService = new EmailService(
            fileSystemLogRepository
        );
        emailService.sendEmailWithFileSystemsLogs(
            ['ml@gmail.com','ml@hotmail.com']
        )
        /** Here we make de timer job */
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log('success'),
                    () => console.log('error in service'),
                ).execute('https://google.com');
            });
    }
}