import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshTokenGuard } from './guard/jwt-refresh-token.guard';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
    imports:[ConfigModule,JwtModule.register({}),PassportModule,UserModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule{}