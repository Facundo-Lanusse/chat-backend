import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Module({
  providers: [GeminiService], // Servicios que pertenecen a este módulo
  exports: [GeminiService], // Servicios que estarán disponibles para otros módulos
})
export class GeminiModule {}
