import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transport } from './transport.entity';

@Injectable()
export class TransportService {
    constructor(
        @InjectRepository(Transport)
        private transportRepository: Repository<Transport>,
    ) { }

    // Método para obtener todos los registros
    async findAll(): Promise<Transport[]> {
        return this.transportRepository.find();
    }

    // Método para crear un nuevo registro
    async create(transport: Transport): Promise<Transport> {
        const newTransport = this.transportRepository.create(transport); // Crea una nueva instancia de la entidad
        return this.transportRepository.save(newTransport); // Guarda el nuevo registro en la base de datos
    }
}
