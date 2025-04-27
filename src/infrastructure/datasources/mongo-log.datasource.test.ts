import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entitites/log.entity";



describe('Test MongoLogDatasource',()=>{

    beforeAll(async()=>{
        await MongoDataBase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    });
    afterEach(async()=>{
        await LogModel.deleteMany(); /**It delete all (in test db) */}
    );

    afterAll(async()=>{
        
        mongoose.connection.close();
    });

    const logDataSource = new MongoLogDatasource();

    const log = new LogEntity({
        message:'test',
        level: LogSeverityLevel.medium,
        origin:'mongo-log.datasource.test.ts'
    });
    test('Should create log with mongo',async()=>{

        
        const logSpy = jest.spyOn(console,'log');



        await logDataSource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Mongo log created:',expect.any(String));
    });

    test('Get logs test',async()=>{
        await logDataSource.saveLog(log);
        const logs = await logDataSource.getLogs(LogSeverityLevel.medium);

        expect(logs.length).toBe(1);
        expect(logs[0]).toEqual({...log,createdAt:expect.any(Date)});
    })

        

});