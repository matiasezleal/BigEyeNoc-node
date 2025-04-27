import fs from 'fs';
import path from 'path';
import { FileSystemsDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entitites/log.entity';

describe('file system datasource test',()=>{

    const logPath = path.join(__dirname,'../../../logs');
    beforeEach(()=>{
        fs.rmSync(logPath,{recursive:true,force:true});
    })
    test('Should create log files if they dont exist',()=>{
        new FileSystemsDatasource();
        const files = fs.readdirSync(logPath);

        /* Be careful with the order of the list*/
        expect(files).toEqual(['logs-high.log','logs-low.log','logs-medium.log']);
    });


    test('should save a log in ',()=>{
        const logDatasource = new FileSystemsDatasource();
        const log = new LogEntity({
            message:'tst',
            level:LogSeverityLevel.low,
            origin:'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        const lowLogs = fs.readFileSync(`${ logPath}/logs-low.log`,'utf-8');

        expect(lowLogs).toContain(JSON.stringify(log));
    });
    test('should save a log in medium ',()=>{
        const logDatasource = new FileSystemsDatasource();
        const log = new LogEntity({
            message:'tst',
            level:LogSeverityLevel.medium,
            origin:'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        //const lowLogs = fs.readFileSync(`${ logPath}/logs-low.log`,'utf-8');
        const medLogs = fs.readFileSync(`${ logPath}/logs-medium.log`,'utf-8');

        expect(medLogs).toContain(JSON.stringify(log));
    });
    /*
    test('Read all logs',async()=>{
        const logDatasource = new FileSystemsDatasource();
        const lowLog = new LogEntity({
            message:'tst',
            level:LogSeverityLevel.low,
            origin:'file-system.datasource.test.ts'
        });
        const mediumLog = new LogEntity({
            message:'tst',
            level:LogSeverityLevel.medium,
            origin:'file-system.datasource.test.ts'
        });
        const highLog = new LogEntity({
            message:'tst',
            level:LogSeverityLevel.high,
            origin:'file-system.datasource.test.ts'
        });

        await logDatasource.saveLog(lowLog);
        await logDatasource.saveLog(mediumLog);
        await logDatasource.saveLog(highLog);

        const savedLowLog= await logDatasource.getLogs(LogSeverityLevel.low);
        const savedMedLog= await logDatasource.getLogs(LogSeverityLevel.medium);
        const savedHighLog= await logDatasource.getLogs(LogSeverityLevel.high);

        expect(savedLowLog).toEqual( expect.arrayContaining([savedLowLog,savedMedLog,savedHighLog]));
        expect(savedMedLog).toEqual(expect.arrayContaining([savedMedLog]));
        expect(savedHighLog).toEqual(expect.arrayContaining([savedHighLog]));

    }); */

});