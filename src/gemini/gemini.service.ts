import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import { MessageRole } from '@prisma/client';

// Tipo para los mensajes que usará Gemini (solo los campos necesarios)
export type GeminiMessage = {
  role: MessageRole;
  content: string;
};

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.ai = new GoogleGenAI({ apiKey });
  }

  /**
   * Genera una respuesta basada en un solo mensaje (método original)
   */
  async generateResponse(prompt: string): Promise<string> {
    try {
      const result = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      // Verificamos que result.text existe antes de devolverlo
      if (result.text) {
        return result.text;
      }

      // Si no hay texto, devolvemos un mensaje por defecto
      return 'No se pudo generar una respuesta';
    } catch (error) {
      console.error('Error generando contenido de Gemini: ', error);
      throw error;
    }
  }

  /**
   * Genera una respuesta considerando el contexto completo de la conversación
   */
  async generateResponseWithContext(
    messages: GeminiMessage[],
    newMessage: string,
  ): Promise<string> {
    try {
      // Construir el prompt con contexto de conversación
      let contextPrompt = '';

      if (messages.length > 0) {
        contextPrompt = 'Contexto de la conversación:\n';
        messages.forEach((msg, index) => {
          const role = msg.role === MessageRole.user ? 'Usuario' : 'Asistente';
          contextPrompt += `${role}: ${msg.content}\n`;
        });
        contextPrompt += '\n';
      }

      contextPrompt += `Usuario: ${newMessage}\nAsistente:`;

      const result = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: contextPrompt,
      });

      if (result.text) {
        return result.text;
      }

      return 'No se pudo generar una respuesta';
    } catch (error) {
      console.error(
        'Error generando contenido de Gemini con contexto: ',
        error,
      );
      throw error;
    }
  }
}
