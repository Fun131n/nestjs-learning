import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module'; 
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm'

@Module({
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
  imports: [
    CatsModule, 
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRoot()
  ]
})
export class AppModule {
  constructor(private connection: Connection){}
}
