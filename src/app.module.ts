import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module'; 
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from './common/config/winston.config';

@Module({
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
  imports: [
    // CatsModule, 
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRoot(
      {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "123456",
        "database": "nest",
        "autoLoadEntities": true,
        "synchronize": true
      }
    ),
    WinstonModule.forRoot(new WinstonConfig()),
  ]
})

export class AppModule {}
