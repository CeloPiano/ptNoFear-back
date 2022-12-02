import { Injectable, HttpException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { OAuth2Client } from "google-auth-library";
import { TokenPayload } from "./interface";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { v4 as uuidv4 } from "uuid";
@Injectable()
export class AuthService{
    constructor(
        private userService: UserService, 
        private jwtService: JwtService, 
        private configService: ConfigService,
        
    ){};

    async googleValidate(token: string){
        try{
            const createUserDto = await this.parseGoogleIdToken(token);
            const user = await this.userService.getUser(createUserDto.googleId);
            if (!user) {
                const newUser = await this.userService.createUser(createUserDto);
                return newUser;
            }
            const{googleId,...updateUserDto} : {googleId: String} & UpdateUserDto = createUserDto;
            const updateUser = await this.userService.update(googleId,updateUserDto);
            return updateUser
        }
        catch(error){
            console.error(error);
            throw new HttpException('Something went wrong',500);
        }
    }

    async parseGoogleIdToken(token: string): Promise<CreateUserDto> {
        const client = new OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));
        
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: this.configService.get('GOOGLE_CLIENT_ID'),
        });

        const {email, name, picture, sub} = ticket.getPayload();

        return {googleId: sub, name, picture}; 
    }

    generateJwtAccessToken(googleId: string){
        const paylod: TokenPayload = {sub: googleId};
        const access_token = this.jwtService.sign(paylod,{
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
        });

        return {
            access_token,
            expires_in: Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')),
        }
    }

    generateCookieWithJwtRefreshToken(googleId: string){
        const jti = uuidv4();
        const paylod: TokenPayload = {sub: googleId, jti};
        const token = this.jwtService.sign(paylod,{
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
        });

        const cookie = `Refresh=${token}; HttpOnly; Path=/; SameSite=None; Secure; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')};`

        return {token,cookie,jti}
    }

    generateCookieForLogOut(){
        return `Refresh=; HttpOnly; Path=/; SameSite=None; Secure; Max-Age=0`
    }
}