import { User } from "@prisma/client";
import { IsString,IsInt,IsBoolean,IsNotEmpty} from "class-validator";
export class UserEntity implements User{
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    googleId: string;

    @IsNotEmpty()
    @IsBoolean()
    isAdmin: boolean;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    picture: string;


    @IsString()
    currentRefreshTokenId: string;
}