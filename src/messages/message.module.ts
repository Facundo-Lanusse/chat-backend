import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { GeminiModule } from 'src/gemini/gemini.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [GeminiModule],
  providers: [MessageService],
  exports: [MessageService], // Para que otros módulos puedan usarlo
})
export class MessageModule {}
