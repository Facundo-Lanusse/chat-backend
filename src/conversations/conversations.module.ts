import { Module } from '@nestjs/common';
import { ConversationService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MessageModule } from '../messages/messages.module';

@Module({
  imports: [MessageModule],
  controllers: [ConversationsController],
  providers: [ConversationService, PrismaService],
  exports: [ConversationService],
})
export class ConversationModule {}
