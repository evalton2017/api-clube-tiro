import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Campeonato } from "./campeonato.model";
import { Divisao } from "./divisao.model";

@Entity()
export class Modalidade {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column({length:200})
    descricao?: string;
    
    @ManyToMany(type => Divisao)
    @JoinTable()
    divisoes?: Divisao[];

    @ManyToMany(type => Campeonato, campeonato => campeonato.modalidades)
    campeoantos?: Campeonato[];
}
