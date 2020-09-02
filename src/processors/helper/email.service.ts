/**
 * 邮件服务
 */

import nodemailer from 'nodemailer';
import * as APP_CONFIG from '@app/app.config';

export interface IEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}


export class EmailService {
  private transporter: nodemailer;
  private isClientValid: boolean;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      secure: true,
      auth: {
        user: APP_CONFIG.EMAIL.account,
        pass: APP_CONFIG.EMAIL.password
      }
    })
    this.verifyClient();
  }

  // 验证有效性
  private verifyClient(): void {
    return this.transporter.verify((error) => {
      if (error) {
        this.isClientValid = false;
        setTimeout(this.verifyClient.bind(this), 1000 * 60 *  30);
        console.warn('邮件客户端初始化连接失败！将在半小时后重试：');
      } else {
        this.isClientValid = true;
        console.info('邮件客户端初始化连接成功！随时可发送邮件');
      }
    });
  }

  public sendMail(mailOptions: IEmailOptions) {
    if (!this.isClientValid) {
      console.warn('由于未初始化成功，邮件客户端发送被拒绝！');
      return false;
    }
    const options = Object.assign(mailOptions, { from: APP_CONFIG.EMAIL.from });
    this.transporter.sendMail(options, (error, info) => {
      if (error) {
        console.warn('邮件发送失败！');
      } else {
        console.info('邮件发送成功', info.messageId, info.response);
      }
    });
  }
}