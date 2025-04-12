import {CronService} from "./cron/cron-service";
import {CheckService} from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemsDatasource } from "../infrastructure/datasources/file-system.datasource";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemsDatasource()
);

export class Server {

    public static start(port: number) {

        console.log('Server started....');

        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
                new CheckService(
                    fileSystemLogRepository,
                    ()=> console.log('success'),
                    ()=> console.log('error in service'),
                ).execute('https://google.com');
            });

    }
}