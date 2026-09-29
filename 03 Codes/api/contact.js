import nodemailer from 'nodemailer';
import {createHandler,smtpOptions} from '../server/contact.mjs';
export default createHandler({env:process.env,send:message=>nodemailer.createTransport(smtpOptions(process.env)).sendMail(message)});
