import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LessonService {
    constructor(private prismaService: PrismaService){}
    async getLessons(){

    }
}