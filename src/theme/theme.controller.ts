import { Controller, Get, HttpCode, HttpStatus, Param, Patch, NotFoundException, Post,Body, Delete} from "@nestjs/common";
import { ThemeService } from "./theme.service";

@Controller('themes')
export class ThemeController{
    constructor(private themeService: ThemeService){}

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updateTheme(@Body('name') name: string,@Param() params){
        const theme = await this.themeService.updateTheme(name,Number(params.id))
        if (!theme) throw new NotFoundException();

        return theme;
    }

    @Post('create')
    @HttpCode(HttpStatus.OK)
    async createTheme(@Body('name') name: string){
        
        const theme = await this.themeService.createTheme(name)
        return theme;
    }

    @Get()
    async getAllThemes(){
        const themes = await this.themeService.getThemes(); 
        return themes;
    }

    @Post('delete')
    async deleteTheme(@Body('id') id: number){
        const theme = await this.themeService.deleteTheme(Number(id))
        return theme
    }
}