"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var sendMail = function (to, subject, content) {
    var user = process.env.MAIL_USER;
    var pass = process.env.MAIL_PASS;
    var transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: user,
            pass: pass
        }
    });
    var message = {
        from: 'ProjectsProgramming <projectsprogramming34@gmail.com>',
        to: to,
        subject: subject,
        html: content
    };
    transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return;
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
    });
};
exports.sendMail = sendMail;
