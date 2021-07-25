import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Perfil } from "./perfil.model";

@Entity()
export class Pessoa{

    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column({length:200})
    nome?: string;
    
    @Column()
    email?: string;

    @Column({nullable: true})
    cpf?: string;

    @Column({nullable: true})
    rg?: string;

    @Column({nullable: true})
    dataexp?: Date;

    @Column({nullable: true})
    datanasc?: Date;

    @Column({nullable: true})
    naturalidade?: string;

    @Column({nullable: true})
    nomemae?: string;

    @Column({nullable: true})
    nomepai?: string;

    @OneToMany(type => Perfil, perfis => perfis.pessoa,{cascade:true})
    perfis?: Perfil[];
   
}
