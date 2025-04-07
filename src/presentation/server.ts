import {CronService} from "./cron/cron-service";
import {CheckService} from "../domain/use-cases/checks/check-service";

export class Server {

    public static start(port: number) {

        console.log('Server started....');

        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
                new CheckService(
                    ()=> console.log('success'),
                    ()=> console.log('error in service'),
                ).execute('https://google.com');
            });

    }
}