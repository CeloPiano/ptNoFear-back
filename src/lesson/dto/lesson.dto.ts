import { PickType } from "@nestjs/mapped-types";
import { LessonEntity } from "../entity/lesson.entity";

export class CreateLessonDto extends PickType(LessonEntity,[
    'link',
    'description',
    'date',
    'local',
    'title',
    'idTheme',
    'idSemester'
]){}