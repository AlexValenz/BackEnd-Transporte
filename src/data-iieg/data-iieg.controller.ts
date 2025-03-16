import { Controller, Get, Post, Query } from '@nestjs/common';
import { DataIiegService } from './data-iieg.service';

@Controller('data-iieg')
export class DataIiegController {
  constructor(private readonly dataIiegService: DataIiegService) {}

  @Post('fetch')
  async fetchData() {
    return this.dataIiegService.fetchDataAndStore();
  }
  
  //Metodo para hacer el filtro
  @Get('filter')
  async filterData(
    @Query('anioInicio') anioInicio: number,
    @Query('mesInicio') mesInicio: number,
    @Query('anioFin') anioFin: number,
    @Query('mesFin') mesFin: number,
    @Query('transporte') transporte: string,
    @Query('variable') variable: string,
  ) {
    return this.dataIiegService.filterData(
      anioInicio,
      mesInicio,
      anioFin,
      mesFin,
      transporte,
      variable,
    );
  }
}