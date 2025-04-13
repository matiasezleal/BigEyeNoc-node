import { LogEntity, LogSeverityLevel } from "../../entitites/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase{
    execute(url:string):Promise<boolean>;
}

type SuccessCallback = () =>void;
type ErrorCallback = (error:string) => void;

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallBack :SuccessCallback,
        private readonly errorCallBack :ErrorCallback,
    ){}
    public async execute(url:string):Promise<boolean> {
        const fileOrigin= 'checks-service.ts';
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error('error occurred');
            }

            const log = new LogEntity({
                message:`Service ${ url } working!`,
                level:LogSeverityLevel.low,
                origin:fileOrigin
            });
            this.logRepository.saveLog(log);
            this.successCallBack();
            console.log(`${url} is ok`);
            return true;
        } catch (e) {
           
            const log = new LogEntity({
                message:`${url} fail. ${e}`,
                level:LogSeverityLevel.high,
                origin:fileOrigin
            });
            this.logRepository.saveLog(log);
            this.errorCallBack(`${e}`);
            return false;
        }



    }
}