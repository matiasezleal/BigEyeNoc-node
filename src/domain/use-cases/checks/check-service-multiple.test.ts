import { LogEntity } from "../../entitites/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";



describe('check-service-multiple.ts test',()=>{



    const MockRepository = [
        {
            saveLog:jest.fn(),
            getLogs:jest.fn()
        },
        {
            saveLog:jest.fn(),
            getLogs:jest.fn()
        }
    ];

    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkServiceMultiple = new CheckServiceMultiple(
        MockRepository,
        successCallback,
        errorCallback
    );
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    test('Should call successCallback',async()=>{

        const result = await checkServiceMultiple.execute('https://google.com');

        expect(result).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(MockRepository[0].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(MockRepository[1].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test('Should call errorCallback',async()=>{

        const result = await checkServiceMultiple.execute('www.googlessdf.com');

        expect(result).toBeFalsy;
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(MockRepository[0].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(MockRepository[1].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
})