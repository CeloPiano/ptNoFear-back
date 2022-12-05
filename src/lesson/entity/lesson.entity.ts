import { Lesson } from "@prisma/client";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TransformDate } from "../decorators/transform-date.decorator";
import { TransformSetHttpsPrefix } from "../decorators/transform-link.decorator";

export class LessonEntity implements Lesson {
    @IsNumber()
    @IsNotEmpty()
    id: number;
  
    @IsString()
    @IsNotEmpty()
    @TransformSetHttpsPrefix()
    link: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsNotEmpty()
    @IsDate()
    @TransformDate()
    date: Date;

    @IsString()
    @IsNotEmpty()
    local: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    idTheme: number;

    @IsNumber()
    @IsNotEmpty()
    idSemester: number;
}