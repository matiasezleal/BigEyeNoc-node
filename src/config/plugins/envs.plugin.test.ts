import { envs } from "./envs.plugin";


describe('envs.plugs.ts', ()=>{

    test('should return env options',()=>{
        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'matias@hotmail.com',
            MAILER_SECRET_KEY: 'icrbefxondxuhvxw',
            PROD: false,
            MONGO_URL: 'mongodb://matias:12345@localhost:27017/',
            MONGO_DB_NAME: 'BigEye-test',
            MONGO_USER: 'matias',
            MONGO_PASS: '12345'
        });
    });


    test('should return error if not found envs',async()=>{
        jest.resetModules();
        process.env.PORT = 'abc';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });
});
