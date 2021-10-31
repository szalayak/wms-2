import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: ['.env', '.env.local'] }),
  ],
})
export class AppModule {}
