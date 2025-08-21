import { Module } from '@nestjs/common';
import { MessageService } from './messages.service';
import { MessagesController } from './messages.controller';
import { GeminiModule } from '../gemini/gemini.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [GeminiModule],
  controllers: [MessagesController],
  providers: [MessageService, PrismaService],
  exports: [MessageService], // Para que otros módulos puedan usarlo
})
export class MessageModule {}
