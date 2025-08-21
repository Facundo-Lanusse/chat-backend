import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MessageService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}

  /**
   * Agregar un mensaje a una conversación existente
   * POST /messages/:conversationId
   */
  @Post(':conversationId')
  @HttpCode(HttpStatus.CREATED)
  async addMessage(
    @Param('conversationId') conversationId: string,
    @Body('content') content: string,
  ) {
    return await this.messageService.addMessageIntoConversationById(
      conversationId,
      content,
    );
  }

  /**
   * Obtener todos los mensajes de una conversación
   * GET /messages/:conversationId
   */
  @Get(':conversationId')
  async getMessages(@Param('conversationId') conversationId: string) {
    return await this.messageService.getMessagesInConversation(conversationId);
  }
}
