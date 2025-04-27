import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDataBase } from "../init";
import { LogModel } from "./log.model";

describe('log.modell.test.ts',()=>{

    beforeAll(async ()=>{
        await MongoDataBase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    });

    afterAll(()=>{
        mongoose.connection.close();
    })

    test('It should return LogModel',async()=>{

        const logData ={
            origin:'log.model.test.ts',
            message:'test',
            level:'low'
        }

        const log = await LogModel.create(logData);

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt:expect.any(Date),
            id: expect.any(String)

        }));

        /* after the test we delete the log */
        await LogModel.findByIdAndDelete(log.id);
        
    });

    test('should return the schema', ()=>{
        /* We confirmed that the shcmea wasn't modified incorrectly*/
        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining({
            message: {
                type: expect.any(Function),
                required: true
            },
            origin:{
                type: expect.any(Function)
            },
            level: {
                type: expect.any(Function),
                enum: ['low','medium','high'],
                default: 'low'
            },
            createdAt:expect.any(Object),
            
        }))
    });
});