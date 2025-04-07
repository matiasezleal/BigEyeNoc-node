interface CheckServiceUseCase{
    execute(url:string):Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase{

    public async execute(url:string):Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error('error occurred');
            }

            console.log(`${url} is ok`);
            return true;
        } catch (e) {
            console.error({e});
            return false;
        }



    }
}