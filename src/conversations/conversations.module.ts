import { Module } from '@nestjs/common';
import { ConversationService } from './conversations.service';

@Module({
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
