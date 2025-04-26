import { LogEntity, LogSeverityLevel } from "../../entitites/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase{
    execute(url:string):Promise<boolean>;
}

type SuccessCallback = () =>void;
type ErrorCallback = (error:string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase{

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallBack :SuccessCallback,
        private readonly errorCallBack :ErrorCallback,
    ){}

    private callSaveLogs(log: LogEntity){
        this.logRepository.forEach(rep=>{
            rep.saveLog(log)
        });
    }
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
            this.callSaveLogs(log);
            this.successCallBack();
            console.log(`${url} is ok`);
            return true;
        } catch (e) {
           
            const log = new LogEntity({
                message:`${url} fail. ${e}`,
                level:LogSeverityLevel.high,
                origin:fileOrigin
            });
            this.callSaveLogs(log);
            this.errorCallBack(`${e}`);
            return false;
        }



    }
}