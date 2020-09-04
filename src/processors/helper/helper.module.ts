/**
 *  帮助类模块 
 */

import { EmailService } from "./email.service";
import { Global, Module } from "@nestjs/common";
import { ExtLoggerService } from "./logger.service";

const services = [
  EmailService,
  ExtLoggerService
]

@Global()
@Module({
  exports: services,
  providers: services,
})

export class HelperModule {}