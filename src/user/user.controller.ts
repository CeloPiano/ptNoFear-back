import { Controller, Get, HttpCode, HttpStatus, UseGuards, Param, Patch, NotFoundException, Req} from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthRequest } from "src/auth/interface";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
@Controller('users')
export class UserController{
    constructor(private userService: UserService){}
    
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async turnInAdmin(@Param() params){
        const user = await this.userService.turnInAdmin(Number(params.id))
    
        if (!user) throw new NotFoundException();

        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req: AuthRequest) {
        const user = await this.userService.getUser(req.user.googleId);
    
        if (!user) throw new NotFoundException();

        return user;
    }

    @Get()
    getAllUsers(){
        return this.userService.getUsers(); 
    }

}