import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entitites/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";


describe('send.email-logs.ts test', ()=>{

    /* when we are mocking we have to be careful with the name of the func to mock*/
    const mockEmailService ={
        sendEmailWithFileSystemsLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository: LogRepository={
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    test('It should call sendEmail and save log',async()=>{

        
        const sendEmailLogs = new SendEmailLogs(
            mockEmailService as any,
            mockLogRepository
        );

        const result = await sendEmailLogs.execute('tets@gmail.com');

        expect(result).toBeTruthy();
        expect(mockEmailService.sendEmailWithFileSystemsLogs).toHaveBeenCalledTimes(1),
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt:expect.any(Date),
            level:'low',
            message: 'Log emails sent succefully!',
            origin:'send-email-logs.ts'
        });
    });

    beforeEach(()=>{
        jest.clearAllMocks();
    });


    test('It should create error log',async()=>{
        mockEmailService.sendEmailWithFileSystemsLogs.mockResolvedValue(false)
        const sendEmailLogs = new SendEmailLogs(
            mockEmailService as any,
            mockLogRepository
        );

        const result = await sendEmailLogs.execute('tets@gmail.com');

        expect(result).toBeFalsy();
        expect(mockEmailService.sendEmailWithFileSystemsLogs).toHaveBeenCalledTimes(1),
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt:expect.any(Date),
            level:'high',
            message: expect.any(String),
            origin:'send-email-logs.ts'
        });
    });


});