
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entitites/log.entity';


interface SendEmailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];

}

interface Attachment{
    filename: string;
    path: string;
}


/* CLASS */
export class EmailService {

    constructor(
        private readonly logRepository: LogRepository
    ){}

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
            
        }
    });

    

    async sendEmail(options: SendEmailOptions): Promise<boolean>{
        const {to, subject,htmlBody, attachments = []} = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html:htmlBody,
                attachments
            });

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message:'Email was sent',
                origin:'email.service.ts'
            });
            this.logRepository.saveLog(log)
            return true;
            
        } catch (error) {

            this.logRepository.saveLog(new LogEntity({
                level: LogSeverityLevel.low,
                message:'Email failed to be sent',
                origin:'email.service.ts'
            }));
            return false;
        }
    }


    /* With this method we send the log files by attachments property of the transporter*/
    async sendEmailWithFileSystemsLogs(to:string| string[]){
        const subject = 'Logs from server';
        const htmlBody= `
                <h4> Logs Status</h4>
                <p>Los logs de hoy presents ....</p>
            `;
        const attachments: Attachment[] = [
            {filename: 'logs-all', path:'./logs/logs-all.log'},
            {filename: 'logs-medium', path:'./logs/logs-medium.log'},
            {filename: 'logs-high', path:'./logs/logs-high.log'}
        ];


        return this.sendEmail({to,subject,attachments,htmlBody});
    }
}