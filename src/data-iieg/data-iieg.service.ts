import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm'; // Importar Between
import { DataIIEG } from './data-iieg-entity';

@Injectable()
export class DataIiegService implements OnModuleInit{
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(DataIIEG)
    private readonly dataIiegRepository: Repository<DataIIEG>,
  ) {}

  async onModuleInit() {
      await this.fetchDataAndStore();
  }

  async fetchDataAndStore() {
    const url = 'http://apiiieg.jalisco.gob.mx/api/etup';
    try {
      // Realizar la solicitud a la API
      const response = await firstValueFrom(this.httpService.get(url));
      const apiResponse = response.data;

      console.log('Respuesta de la API:', apiResponse); // Imprimir la respuesta completa

      // Verificar si la respuesta tiene el campo "data" y si es un array
      if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
        throw new Error('La respuesta de la API no contiene un array de datos.');
      }

      // Almacenar los datos en la base de datos
      for (const item of apiResponse.data) {
        // Verificar si el campo Valor es nulo o indefinido
        if (item.Valor === null || item.Valor === undefined) {
          console.warn('Registro con Valor nulo omitido:', item);
          continue; // Saltar este registro
        }

        // Crear la entidad y asignar los valores
        const dataIieg = this.dataIiegRepository.create({
          id: item._id, // Usar el _id de la API como id
          anio: item.Anio,
          idMes: item.ID_mes,
          transporte: item.Transporte,
          variable: item.Variable,
          idEntidadUnico: item.ID_entidad_unico,
          idEntidad: item.ID_entidad,
          entidad: item.Entidad,
          idMunicipioUnico: item.ID_municipio_unico,
          idMunicipio: item.ID_Municipio,
          municipio: item.Municipio,
          valor: item.Valor,
          estatus: item.Estatus,
        });

        // Guardar la entidad en la base de datos
        await this.dataIiegRepository.save(dataIieg);
      }

      return 'Datos extraídos y almacenados correctamente.';
    } catch (error) {
      // Manejar errores y lanzar una excepción con un mensaje descriptivo
      throw new Error(`Error al realizar la solicitud: ${error.message}`);
    }
  }

  async findAll() {
    // Obtener todos los registros de la base de datos
    return this.dataIiegRepository.find();
  }

  async filterData(
    anioInicio: number,
    mesInicio: number,
    anioFin: number,
    mesFin: number,
    transporte: string,
    variable: string,
  ) {
    // Construir el objeto de filtros dinámicamente
    const filters: any = {};

    // Filtro por rango de años y meses
    if (anioInicio && mesInicio && anioFin && mesFin) {
      filters.anio = Between(anioInicio, anioFin); // Usar Between para el rango de años
      filters.idMes = Between(mesInicio, mesFin); // Usar Between para el rango de meses
    }

    // Filtro por transporte
    if (transporte && transporte !== 'todos') {
      filters.transporte = transporte;
    }

    // Filtro por variable (estadística)
    if (variable) {
      filters.variable = variable;
    }

    // Ejecutar la consulta con los filtros
    return this.dataIiegRepository.find({
      where: filters,
    });
  }
}