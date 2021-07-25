import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Divisao } from "./divisao.model";
import { Modalidade } from "./modalidade.model";

@Entity()
export class Categoria {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column({length:200})
    descricao?: string;


}