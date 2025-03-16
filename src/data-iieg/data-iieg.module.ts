import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataIIEG } from './data-iieg-entity';
import { DataIiegService } from './data-iieg.service';
import { DataIiegController } from './data-iieg.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([DataIIEG]), HttpModule],
  providers: [DataIiegService],
  controllers: [DataIiegController], // Asegúrate de que el controlador está aquí
})
export class DataIiegModule {}
