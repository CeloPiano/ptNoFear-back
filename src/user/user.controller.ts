import { Controller, Get, Param, Patch} from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    constructor(private userService: UserService){}

    @Get()
    getAllUsers(){
        return this.userService.getUsers(); 
    }

    @Patch(':id')
    turnInAdmin(@Param() params){
        return this.userService.turnInAdmin(Number(params.id))
    }
}