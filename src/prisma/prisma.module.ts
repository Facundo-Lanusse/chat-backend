import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// define que este servicio esta disponibles en todas partes asi no lo tengo que declarar en el constructor de cada servicio
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Para que otros módulos puedan usarlo
})
export class PrismaModule {}
