import { LogEntity } from "../../entitites/log.entity";
import { CheckService } from "./check-service";


describe('check-service.ts test',()=>{



    const MockRepository = {
        saveLog:jest.fn(),
        getLogs:jest.fn()
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkService = new CheckService(
        MockRepository,
        successCallback,
        errorCallback
    );
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    test('Should call successCallback',async()=>{

        const result = await checkService.execute('https://google.com');

        expect(result).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(MockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test('Should call errorCallback',async()=>{

        const result = await checkService.execute('www.googlessdf.com');

        expect(result).toBeFalsy;
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(MockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
})