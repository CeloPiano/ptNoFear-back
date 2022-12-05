import { Patch,Param, Controller, Get, HttpCode, HttpStatus, Body, Post, NotFoundException} from "@nestjs/common";
import { CreateLessonDto } from "./dto/lesson.dto";
import { LessonService } from "./lesson.service";


@Controller('lessons')
export class LessonController{
    constructor(private lessonService: LessonService){}
    
    @Post('create')
    @HttpCode(HttpStatus.OK)
    async createLesson(@Body() createLessonDto: CreateLessonDto){
        const lesson = await this.lessonService.createLesson(createLessonDto)
        return lesson;
    
    }

    @Post('delete')
    async deleteLesson(@Body('id') id: number){
        const lesson = await this.lessonService.deleteLesson(Number(id))
        return lesson
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllLessons(){
        const lessons = await this.lessonService.getLessons()
        return lessons
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getLesson(@Param() params){
        const lesson = await this.lessonService.getLesson(Number(params.id))
        return lesson
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updateLesson(@Body() createLessonDto: CreateLessonDto,@Param() params){
        const lesson = await this.lessonService.updateLesson(createLessonDto,Number(params.id))
        
        if (!lesson) throw new NotFoundException();

        return lesson;
    }

}