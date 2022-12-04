import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService){}

    async getUser(googleId: string){
        return await this.prismaService.user.findUnique(
            {
                where:{
                    googleId: googleId
                },
                select:{
                    id: true,
                    googleId: true,
                    isAdmin: true,
                    name: true,
                    picture: true
                }
            }
        );
    }

    async getUsers(){
        return await this.prismaService.user.findMany(
            {
                select:{
                    id: true,
                    name: true,
                    isAdmin: true
                }
            }
        );
    }
    
    async createUser(createUserDto: CreateUserDto){
        return await this.prismaService.user.create(
            {
                data:{
                    //mesma coisa//
                    //name: createUserDto.name
                    // ....
                    ...createUserDto
                },
                select:{
                    id: true,
                    googleId: true,
                    isAdmin: true,
                    name: true,
                    picture: true
                }
            }
        );
    }

    async update(googleId: string, updateUserDto: UpdateUserDto){
        return await this.prismaService.user.update({
            where:{
                googleId: googleId
            },
            data:{
                ...updateUserDto
            },
            select:{
                id: true,
                googleId: true,
                isAdmin: true,
                name: true,
                picture: true
            }
        });
    }

    async turnInAdmin(id: number){
        return await this.prismaService.user.update(
            {
                where: {
                    id: id
                },
                data: {
                    isAdmin: true
                },
                select:{
                    isAdmin: true
                }
            }
        );
    }

    async setRefreshTokenId(googleId: string, currentRefreshTokenId: string) {
        return await this.prismaService.user.update({
          where: { googleId: googleId },
          data: { currentRefreshTokenId },
          select: { googleId: true },
        });
    }
    
    async verifyRefreshTokenId(googleId: string, refreshTokenId: string) {
        const user = await this.prismaService.user.findUniqueOrThrow({
          where: { googleId: googleId },
        });
    
        if (user.currentRefreshTokenId !== refreshTokenId) {
          throw new UnauthorizedException('Refresh token is not valid');
        }
        return { googleId: user.googleId };
    }
    
    async removeRefreshTokenId(googleId: string) {
        return await this.prismaService.user.update({
          where: { googleId: googleId },
          data: { currentRefreshTokenId: null },
          select: { googleId: true },
        });
    }
}