import { create } from "domain";


export enum LogSeverityLevel {
    low= 'low',
    medium= 'medium',
    high= 'high'
}

export interface LogEntityOptions{
    level: LogSeverityLevel
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {


    public level: LogSeverityLevel
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions){
        const {message, level, origin, createdAt = new Date()} = options; // if no createdAt just use the new Date()
        this.message = message;
        this.level = level;
        this.createdAt= new Date();
        this.origin = origin;
    }


    static fromJson = (json: string):LogEntity =>{
        const {message, level, createdAt,origin} =JSON.parse(json);

        //TODO: add validations
        const log = new LogEntity({
            message:message,
            level:level,
            createdAt: createdAt,
            origin:origin
        });
        log.createdAt= new Date(createdAt);
        return log;
    }
}