import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


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
}