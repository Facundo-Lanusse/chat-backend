import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Servicio que maneja la lógica de negocio para conversaciones
 */
@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea una nueva conversación vacía
   */
  async createConversation() {
    try {
      return await this.prisma.conversation.create({
        data: {},
        include: {
          messages: true, // Incluir mensajes en la respuesta (será un array vacío)
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la conversación');
    }
  }

  /**
   * Obtiene todas las conversaciones ordenadas por última actividad
   */
  async getAllConversations() {
    try {
      return await this.prisma.conversation.findMany({
        include: {
          messages: {
            orderBy: { createdAt: 'asc' }, // Mensajes ordenados cronológicamente
          },
          _count: {
            select: { messages: true }, // Incluir conteo de mensajes
          },
        },
        orderBy: { updatedAt: 'desc' }, // Conversaciones más recientes primero
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener las conversaciones',
      );
    }
  }

  /**
   * Obtiene una conversación específica por su ID
   */
  async getConversation(id: string) {
    // Validar que el ID no esté vacío
    if (!id || id.trim().length === 0) {
      throw new BadRequestException('El ID de la conversación es requerido');
    }

    try {
      const conversation = await this.prisma.conversation.findUnique({
        where: { id },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      // Validar que la conversación existe
      if (!conversation) {
        throw new NotFoundException(
          `Conversación con ID "${id}" no encontrada`,
        );
      }

      return conversation;
    } catch (error) {
      // Re-lanzar errores conocidos
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      // Manejar errores de base de datos
      throw new InternalServerErrorException(
        'Error al obtener la conversación',
      );
    }
  }

  /**
   * Elimina una conversación y todos sus mensajes
   */
  async deleteConversation(id: string) {
    // Validar que el ID no esté vacío
    if (!id || id.trim().length === 0) {
      throw new BadRequestException('El ID de la conversación es requerido');
    }

    try {
      // Prisma automáticamente eliminará los mensajes por el onDelete: Cascade
      return await this.prisma.conversation.delete({
        where: { id },
        include: {
          messages: true, // Incluir los mensajes eliminados en la respuesta
        },
      });
    } catch (error) {
      // Verificar si es un error de "registro no encontrado"
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Conversación con ID "${id}" no encontrada`,
        );
      }
      throw new InternalServerErrorException(
        'Error al eliminar la conversación',
      );
    }
  }

  /**
   * Método auxiliar: Obtiene las conversaciones más recientes con un límite
   */
  async getRecentConversations(limit: number = 10) {
    try {
      return await this.prisma.conversation.findMany({
        take: limit,
        include: {
          messages: {
            take: 1, // Solo el mensaje más reciente
            orderBy: { createdAt: 'desc' },
          },
          _count: {
            select: { messages: true },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener conversaciones recientes',
      );
    }
  }
}
