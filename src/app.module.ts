import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiModule } from './gemini/gemini.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './messages/message.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  // Importamos los distintos modulos necesarios para el proyecto
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GeminiModule,
    ConversationModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
