import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';

@Module({
    imports:[PrismaModule],
    providers:[ThemeService],
    controllers:[ThemeController],
    exports:[ThemeService]
})
export class ThemeModule {}
