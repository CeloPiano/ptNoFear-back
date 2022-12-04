import { Controller, Get, HttpCode, HttpStatus, Param, Patch, NotFoundException, Post,Body, Delete} from "@nestjs/common";
import { SemesterService } from "./semester.service";

@Controller('semesters')
export class SemesterController{
    constructor(private semesterService: SemesterService){}

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updateSemester(@Body('name') name: string,@Param() params){
        const semester = await this.semesterService.updateSemester(name,Number(params.id))
        if (!semester) throw new NotFoundException();

        return semester;
    }

    @Post('create')
    @HttpCode(HttpStatus.OK)
    async createSemester(@Body('name') name: string){
        
        const semester = await this.semesterService.createSemester(name)
        return semester;
    }

    @Get()
    async getAllSemesters(){
        const semesters = await this.semesterService.getSemesters(); 
        return semesters;
    }

    @Post('delete')
    async deleteSemester(@Body('id') id: number){
        const semester = await this.semesterService.deleteSemester(Number(id))
        return semester
    }
}