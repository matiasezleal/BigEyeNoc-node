import mongoose from "mongoose";
import { MongoDataBase } from "./init"


describe('init mongoDB',()=>{

    afterAll(()=>{
        mongoose.connection.close();
    });

    /* TESTS */
    test('should connect to mongo',async ()=>{

        const hasConnected= await MongoDataBase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });

        expect(hasConnected).toBe(true);
    });

    test('should throw error when try to connect to mongo',async()=>{

        const hasConnected = await MongoDataBase.connect({
            dbName: process.env.MONGO_DB_NAME! + 'sadf',
            mongoUrl: process.env.MONGO_URL!+'sfdsf'
        });

        expect(hasConnected).toThrow();
    });
})