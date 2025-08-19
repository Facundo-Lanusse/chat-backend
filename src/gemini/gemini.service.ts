import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const result = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
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
}
