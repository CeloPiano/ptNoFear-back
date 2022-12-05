import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UnauthorizedException } from "@nestjs/common";
import { CreateLessonDto } from "./dto/lesson.dto";

@Injectable()
export class LessonService {
    constructor(private prismaService: PrismaService){}
    
    async getLessons(){
        return await this.prismaService.lesson.findMany(
            {
                select:{
                    id: true,
                    link: true,
                    local: true,
                    description: true,
                    title: true,
                    date: true,
                    idSemester: true,
                    idTheme: true
                    
                }
            }
        );
    }

    async getLesson(id: number){
        return await this.prismaService.lesson.findUnique(
            {
                where:{
                    id,
                },
                select:{
                    id: true,
                    link: true,
                    local: true,
                    description: true,
                    title: true,
                    date: true,
                    idSemester: true,
                    idTheme: true
                    
                }
            }
        );
    }

    async createLesson(createLessonDto: CreateLessonDto){
        return await this.prismaService.lesson.create(
            {
                data:{
                    ...createLessonDto
                },
                select:{
                    id: true,
                    link: true,
                    local: true,
                    description: true,
                    title: true,
                    date: true,
                    idSemester: true,
                    idTheme: true
                    
                }
            }
        );
    }

    async deleteLesson(id: number){
        return await this.prismaService.lesson.delete({
            where:{
                id,
            },
            select:{
                id: true,
                link: true,
                local: true,
                description: true,
                title: true,
                date: true,
                idSemester: true,
                idTheme: true
                
            }
        })
    }

    async updateLesson(createLessonDto: CreateLessonDto,id: number){
        return await this.prismaService.lesson.update(
            {
                where:{
                    id: id
                },
                data:{
                    ...createLessonDto
                },
                select:{
                    id: true,
                    link: true,
                    local: true,
                    description: true,
                    title: true,
                    date: true,
                    idSemester: true,
                    idTheme: true
                    
                }
            }
        );
    }
}