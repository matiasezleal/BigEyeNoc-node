
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';


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

export class EmailService {

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

            
            return true;
            
        } catch (error) {
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