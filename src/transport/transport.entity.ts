import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transport {
    @PrimaryGeneratedColumn()
    id: number;
  
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
  
    @Column('decimal')
    valor: number;
  
    @Column()
    estatus: string;
}

export default Transport;
