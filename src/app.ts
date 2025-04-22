import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "./data/mongo";
import {Server} from "./presentation/server";


( async ()=>{
    await main();
})();


async function main(){

    await MongoDataBase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME

    });


    // create coleccion
    /*
    const newLog = await LogModel.create({
        message: 'fourth message from mong',
        origin:'app.ts',
        level:'medium'
    });

    await newLog.save();

    console.log(newLog);*/
    //Server.start(3000);
}