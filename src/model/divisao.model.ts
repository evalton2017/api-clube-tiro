import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Arma } from "./arma.model";
import { Categoria } from "./categoria.model";

@Entity()
export class Divisao {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column({length:200})
    descricao?: string;

    @ManyToMany(type => Categoria, {cascade : true})
    @JoinTable()
    categorias?: Categoria[];

    @ManyToMany(type => Arma,{cascade : true})
    @JoinTable()
    armas?: Arma[];

     
}