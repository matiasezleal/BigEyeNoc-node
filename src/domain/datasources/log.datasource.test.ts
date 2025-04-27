import { LogEntity, LogSeverityLevel } from "../entitites/log.entity";
import { LogDataSource } from "./log.datasource";

describe('log.datasource.ts LogDatasource test', ()=>{

    const log = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test LogDatasource',
        level: LogSeverityLevel.low
    });
    class MockLogDatasource implements LogDataSource{
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [log];
        }
        
    }
    test('We test the abstract class',async()=>{

        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(typeof mockLogDatasource.saveLog).toBe('fuction');
        expect(typeof mockLogDatasource.getLogs).toBe('function');

        await mockLogDatasource.saveLog(log);
        const logsData =await mockLogDatasource.getLogs(LogSeverityLevel.low);
        expect(logsData).toHaveLength(1);
        expect(logsData[0]).toBeInstanceOf(LogEntity);

       

    });
});