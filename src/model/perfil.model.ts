import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pessoa } from "./pessoa.model";

@Entity()
export class Perfil{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    nome?: string;

    @ManyToOne(type => Pessoa, pessoa=> pessoa.perfis)
    pessoa?: Pessoa;
}