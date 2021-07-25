import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Pessoa } from "./pessoa.model";
import {Endereco} from './endereco.model';
import {Telefone} from './telefone.model';
import { InscricaoCamp } from "./inscricaoCamp.model";

@Entity()
export class Filiado{

    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number | undefined;
    
    @OneToOne(type=>Pessoa)
    @JoinColumn()
    pessoa?: Pessoa;

    @OneToOne(type=>Endereco,{cascade:true})
    @JoinColumn()
    endereco?: Endereco;
    
    @Column({nullable: true})
    atirador?: boolean;
    
    @Column({nullable: true})
    colecionador?: boolean;
   
    @Column({nullable: true})
    cacador?: boolean;
   
    @Column({nullable: true})
    instrutor?: boolean;

    @Column({default:false})
    ativo?: boolean;

    @Column({nullable: true})
    foto?: string;

    @Column({nullable: true})
    cr?: string;

    @Column({nullable: true})
    validadeCr?: Date;

    @OneToMany(type => Telefone, telefone => telefone.filiado)
    telefones?: Telefone[];

    @OneToMany(type => InscricaoCamp, inscricao => inscricao.filiado, {nullable: true})
    inscricoes?: InscricaoCamp[];

}