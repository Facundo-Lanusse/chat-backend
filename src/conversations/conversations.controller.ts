import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ConversationService } from './conversations.service';
import { MessageService } from '../messages/messages.service';

@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
  ) {}

  /**
   * Crear una nueva conversación vacía
   * POST /conversations
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createConversation() {
    return await this.conversationService.createConversation();
  }

  /**
   * Obtener todas las conversaciones
   * GET /conversations
   */
  @Get()
  async getAllConversations() {
    return await this.conversationService.getAllConversations();
  }

  /**
   * Obtener conversaciones recientes con límite opcional
   * GET /conversations/recent?limit=10
   */
  @Get('recent')
  async getRecentConversations(@Query('limit') limit?: string) {
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return await this.conversationService.getRecentConversations(limitNumber);
  }

  /**
   * Obtener una conversación específica por ID
   * GET /conversations/:id
   */
  @Get(':id')
  async getConversation(@Param('id') id: string) {
    return await this.conversationService.getConversation(id);
  }

  /**
   * Eliminar una conversación
   * DELETE /conversations/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteConversation(@Param('id') id: string) {
    await this.conversationService.deleteConversation(id);
  }

  /**
   * Agregar mensaje a una conversación y obtener respuesta de IA
   * POST /conversations/:id/messages
   */
  @Post(':id/messages')
  @HttpCode(HttpStatus.CREATED)
  async addMessage(
    @Param('id') conversationId: string,
    @Body('content') content: string,
  ) {
    const result = await this.messageService.addMessageIntoConversationById(
      conversationId,
      content,
    );

    // Retornar el historial completo de la conversación
    const messages =
      await this.messageService.getMessagesInConversation(conversationId);
    return messages;
  }

  /**
   * Obtener historial de mensajes de una conversación
   * GET /conversations/:id/messages
   */
  @Get(':id/messages')
  async getMessages(@Param('id') conversationId: string) {
    return await this.messageService.getMessagesInConversation(conversationId);
  }
}
