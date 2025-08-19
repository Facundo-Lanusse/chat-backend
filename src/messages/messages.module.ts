import { Module } from '@nestjs/common';
import { MessageService } from './messages.service';
import { GeminiModule } from '../gemini/gemini.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [GeminiModule],
  providers: [MessageService],
  exports: [MessageService], // Para que otros módulos puedan usarlo
})
export class MessageModule {}
