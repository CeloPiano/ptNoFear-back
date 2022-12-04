import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SemesterService {
    constructor(private prismaService: PrismaService){}
    async createSemester(name: string){
        return await this.prismaService.semester.create(
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
    
    async updateSemester(name: string, id: number){
        return await this.prismaService.semester.update(
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

    async getSemesters(){
        return await this.prismaService.semester.findMany(
            {   
                select:{
                    id: true,
                    name: true,
                }
            }
        );
    }

    async deleteSemester(id: number){
        return await this.prismaService.semester.delete({
            where:{
                id,
            },
            select:{
                id: true,
                name: true,
            }
        })
    }
}