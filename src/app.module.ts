import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SemesterModule } from './semester/semester.module';
import { UserModule } from './user/user.module';
import { ThemeModule } from './theme/theme.module';

@Module({
imports: [PrismaModule,UserModule,ConfigModule.forRoot(),AuthModule,SemesterModule,ThemeModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
