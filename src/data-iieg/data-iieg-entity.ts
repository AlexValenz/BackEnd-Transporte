import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('data_iieg')
export class DataIIEG {
  @PrimaryColumn() // Cambiar a PrimaryColumn y tipo string
  id: string;

  @Column()
  anio: number;

  @Column()
  idMes: number;

  @Column()
  transporte: string;

  @Column()
  variable: string;

  @Column()
  idEntidadUnico: string;

  @Column()
  idEntidad: number;

  @Column()
  entidad: string;

  @Column()
  idMunicipioUnico: string;

  @Column()
  idMunicipio: number;

  @Column()
  municipio: string;

  @Column('float')
  valor: number;

  @Column()
  estatus: string;
}