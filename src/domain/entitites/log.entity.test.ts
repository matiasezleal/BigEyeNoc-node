import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('log.entity.ts test', ()=>{

    test('Should create a LogEntity ',()=>{
        const log = new LogEntity({
            origin:'log.entity.test.ts',
            message:'test LogEntity',
            level:LogSeverityLevel.high
        });
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('test LogEntity');
        expect(log.origin).toBe('log.entity.test.ts');
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('It should return a LogEntity form function fromJson',()=>{

        const json = `{"message":"Service https://google.com working!","level":"low","createdAt":"2025-04-26T01:17:15.201Z","origin":"checks-service.ts"}`;
    
        const newlog = LogEntity.fromJson(json);

        expect(newlog).toBeInstanceOf(LogEntity);
        expect(newlog.message).toBe("Service https://google.com working!");
        expect(newlog.level).toBe('low');
        expect(newlog.origin).toBe("checks-service.ts");
        expect(newlog.createdAt).toBeInstanceOf(Date);
        expect(newlog.createdAt).toEqual(new Date("2025-04-26T01:17:15.201Z"));

    });

    test('It should return a LogEntity from function fromObject',()=>{
        const log = {
            origin:'log.entity.test.ts',
            message:'test LogEntity',
            level:LogSeverityLevel.high
        };
        const newLog = LogEntity.fromObject(log);
        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog.message).toBe('test LogEntity');
        expect(newLog.origin).toBe('log.entity.test.ts');
        expect(newLog.createdAt).toBeInstanceOf(Date);
    });

} );