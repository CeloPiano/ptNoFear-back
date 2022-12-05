import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';

@Module({
    imports:[PrismaModule],
    providers:[LessonService],
    controllers:[LessonController],
    exports:[LessonService]
})
export class LessonModule {}
