import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Filiado } from "./filiado.model";
import {StatusEnum} from './status.enum';


@Entity()
export class Requerimento{

    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id?: number;
    
    @OneToOne(type=>Filiado)
    @JoinColumn()
    filiado?: Filiado;

    @Column('text')
    status?: StatusEnum;

    @Column({nullable: true})
    colecionamento?: boolean;
    @Column({nullable: true})
    tiroDesp?: boolean;
    @Column({nullable: true})
    caca?: boolean;
    @Column({nullable: true})
    entDesp?: boolean;
    @Column({nullable: true})
    aquicaoAcessorio?: boolean;
    @Column({nullable: true})
    tipo?: string;
    @Column({nullable: true})
    calibre?: string;
    @Column({nullable: true})
    marca?: string;
    @Column({nullable: true})
    modelo?: string;
    @Column({nullable: true})
    quantidade?: number;
    @Column({nullable: true})
    fornecedor?: string;
    @Column({nullable: true})
    cnpj?: string;
    @Column({nullable: true})
    crForn?: string;
    @Column({nullable: true})
    dadosTec?: string;
    

}