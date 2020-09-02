/**
 *  帮助类模块 
 */

import { EmailService } from "./email.service";
import { Global, Module } from "@nestjs/common";

const services = [
  EmailService
]

@Global()
@Module({
  exports: services,
  providers: services,
})

export class HelperModule {}