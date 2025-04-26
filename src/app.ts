import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "./data/mongo";
import { PrismaClient } from "./generated/prisma/client";
import {Server} from "./presentation/server";


( async ()=>{
    await main();
})();


async function main(){

    await MongoDataBase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME

    });


    Server.start(3000);
}