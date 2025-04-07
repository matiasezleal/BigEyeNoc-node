interface CheckServiceUseCase{
    execute(url:string):Promise<boolean>;
}

type SuccessCallback = () =>void;
type ErrorCallback = (error:string) => void;

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly successCallBack :SuccessCallback,
        private readonly errorCallBack :ErrorCallback,
    ){}
    public async execute(url:string):Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error('error occurred');
            }

            this.successCallBack();
            console.log(`${url} is ok`);
            return true;
        } catch (e) {
            //console.error({e});
            this.errorCallBack(`${e}`);
            return false;
        }



    }
}