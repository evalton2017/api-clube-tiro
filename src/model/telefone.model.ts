import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Filiado } from "./filiado.model";

@Entity()
export class Telefone{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    ddd?: string;

    @Column()
    numero?: string;

    @ManyToOne(type => Filiado, filiado=> filiado.telefones)
    filiado?: Filiado;
}