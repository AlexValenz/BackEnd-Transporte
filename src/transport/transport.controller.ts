import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransportService } from './transport.service';
import { Transport } from './transport.entity';


@Controller('transport')
export class TransportController {
    constructor(private readonly transportService: TransportService) {}

  // Ruta para obtener todos los transportes
  @Get()
  async findAll(): Promise<Transport[]> {
    return this.transportService.findAll();
  }

  // Ruta para crear un nuevo transporte
  @Post()
  async create(@Body() transport: Transport): Promise<Transport> {
    return this.transportService.create(transport);
  }
}
