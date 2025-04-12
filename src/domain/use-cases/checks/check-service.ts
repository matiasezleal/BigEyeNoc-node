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

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error('error occurred');
            }

            const log = new LogEntity(`Service ${ url } working!`, LogSeverityLevel.low);
            this.logRepository.saveLog(log);
            this.successCallBack();
            console.log(`${url} is ok`);
            return true;
        } catch (e) {
           
            const log = new LogEntity(`${url} fail. ${e}`,LogSeverityLevel.high);
            this.logRepository.saveLog(log);
            this.errorCallBack(`${e}`);
            return false;
        }



    }
}