/**
 * 邮件服务
 */

import nodemailer from 'nodemailer';
import * as APP_CONFIG from '@app/app.config';
import { ExtLoggerService } from './logger.service';
import { Inject } from '@nestjs/common';
export interface IEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}


export class EmailService {
  private transporter: nodemailer;
  private isClientValid: boolean;

  constructor(
    @Inject(ExtLoggerService) private readonly logger: ExtLoggerService
    ) {
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
        this.logger.warn('邮件服务初始化失败，将在半小时后重试');
      } else {
        this.isClientValid = true;
        this.logger.log('邮件服务初始化成功');
      }
    });
  }

  public sendMail(mailOptions: IEmailOptions) {
    if (!this.isClientValid) {
      this.logger.error('由于未初始化成功，邮件发送被拒绝');
      return false;
    }
    const options = Object.assign(mailOptions, { from: APP_CONFIG.EMAIL.from });
    this.transporter.sendMail(options, (error, info) => {
      if (error) {
        this.logger.error('邮件发送失败。');
      } else {
        this.logger.log('邮件发送成功');
      }
    });
  }
}