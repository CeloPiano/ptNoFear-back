import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req,UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtRefreshTokenGuard } from './guard/jwt-refresh-token.guard';
import { AuthRequest } from './interface';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,private authService: AuthService){};

    @Post('google')
    @HttpCode(HttpStatus.OK)
    async googleLogin(@Req() req: Request,@Body('token') token: string){
        const user = await this.authService.googleValidate(token);
        const {access_token,expires_in} = this.authService.generateJwtAccessToken(user.googleId);
        const refreshToken = this.authService.generateCookieWithJwtRefreshToken(user.googleId);
        await this.userService.setRefreshTokenId(user.googleId, refreshToken.jti);
        req.res.setHeader('Set-Cookie', refreshToken.cookie);
        return {access_token,expires_in,user}
      
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Req() req: AuthRequest) {
        await this.userService.removeRefreshTokenId(req.user.googleId);
        const cookie = this.authService.generateCookieForLogOut();
        req.res.setHeader('Set-Cookie', cookie);
    }

    @UseGuards(JwtRefreshTokenGuard)
    @Get('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Req() req: AuthRequest) {
        const { access_token, expires_in } = this.authService.generateJwtAccessToken(req.user.googleId);
        const refreshToken = this.authService.generateCookieWithJwtRefreshToken(req.user.googleId,);
         await this.userService.setRefreshTokenId(req.user.googleId, refreshToken.jti);
        req.res.setHeader('Set-Cookie', refreshToken.cookie);
        return { access_token, expires_in };
    }
}