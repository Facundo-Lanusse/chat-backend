import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MessageRole } from '@prisma/client';
import { GeminiService, GeminiMessage } from '../gemini/gemini.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gemini: GeminiService,
  ) {}

  async addMessageIntoConversationById(
    conversationId: string,
    content: string,
  ) {
    // Validaciones de entrada
    if (!conversationId || conversationId.trim().length === 0) {
      throw new BadRequestException('El ID de la conversación es requerido');
    }

    if (!content || content.trim().length === 0) {
      throw new BadRequestException(
        'El contenido del mensaje no puede estar vacío',
      );
    }

    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    // verifico que la conversacion exista
    if (!conversation) {
      throw new NotFoundException(
        `Conversación con ID "${conversationId}" no encontrada`,
      );
    }

    try {
      // Obtener mensajes previos de la conversación para dar contexto
      const previousMessages = await this.prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
        select: {
          role: true,
          content: true,
        },
      });

      // Convertir mensajes de Prisma al formato que espera Gemini
      const chatHistory: GeminiMessage[] = previousMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // agrego el mensaje del usuario
      const userMessage = await this.prisma.message.create({
        data: {
          conversationId,
          role: MessageRole.user,
          // me aseguro que no tenga espacios al inicio o final
          content: content.trim(),
        },
      });

      // genero la respuesta de la IA con contexto de conversación
      const geminiAiResponse = await this.gemini.generateResponseWithContext(
        chatHistory,
        content.trim(),
      );

      // guardo la respuesta de la IA
      const geminiAiMessage = await this.prisma.message.create({
        data: {
          conversationId,
          role: MessageRole.assistant,
          content: geminiAiResponse,
        },
      });

      // actualizo el timeStamp del mensaje del usuario
      await this.prisma.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });

      // retorno el mensaje completo para dar contexto para el frontend
      return {
        userMessage,
        geminiAiMessage,
        conversationId,
      };
    } catch (error) {
      console.error('Error al procesar mensaje:', error);
      throw new InternalServerErrorException(
        'Error al procesar el mensaje. Inténtalo de nuevo.',
      );
    }
  }

  async getMessagesInConversation(conversationId: string) {
    if (!conversationId || conversationId.trim().length === 0) {
      throw new BadRequestException('El ID de la conversación es requerido');
    }
    // busco la conversacion por su ID
    const messageResult = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    // verifico el resultado de la query
    if (!messageResult) {
      throw new NotFoundException(
        `Conversacion con ID "${conversationId}" no encontrada`,
      );
    }

    try {
      // busco los mensajes dentro de la conversacion
      const message = await this.prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
      });
      return message;
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
      throw new InternalServerErrorException(
        'Error al obtener los mensajes. Inténtalo de nuevo.',
      );
    }
  }
}
