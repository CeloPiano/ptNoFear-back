import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SemesterController } from './semester.controller';
import { SemesterService } from './semester.service';

@Module({
    imports:[PrismaModule],
    providers:[SemesterService],
    controllers:[SemesterController],
    exports:[SemesterService]
})
export class SemesterModule {}
