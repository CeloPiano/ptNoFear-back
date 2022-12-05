import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ThemeService {
    constructor(private prismaService: PrismaService){}
    async createTheme(name: string){
        return await this.prismaService.theme.create(
            {
                data:{
                    name,
                },
                select:{
                    id: true,
                    name: true,
                }
            }
        );
    }
    
    async updateTheme(name: string, id: number){
        return await this.prismaService.theme.update(
            {   
                where:{
                    id,
                },
                data:{
                    name,
                },
                select:{
                    id: true,
                    name: true,
                }
            }
        );
    }

    async getThemes(){
        return await this.prismaService.theme.findMany(
            {   
                select:{
                    id: true,
                    name: true,
                }
            }
        );
    }

    async deleteTheme(id: number){
        return await this.prismaService.theme.delete({
            where:{
                id,
            },
            select:{
                id: true,
                name: true,
            }
        })
    }

    async getTheme(id: number){
        return await this.prismaService.theme.findUnique(
            {
                where:{
                    id,
                },
                select:{
                    id: true,
                    name: true
                }
            }
        );
    }
}