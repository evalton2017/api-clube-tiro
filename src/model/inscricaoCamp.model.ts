import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Campeonato } from "./campeonato.model";
import { Filiado } from "./filiado.model";

@Entity()
export class InscricaoCamp{

    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id?: number;
    
    @ManyToOne(type => Filiado, filiado=> filiado.inscricoes, {cascade: true})
    filiado?: Filiado;

    @ManyToOne(type => Campeonato, campeonato=> campeonato.inscricoes, {cascade: true})
    campeonato?: Campeonato;

    @Column({nullable: true})
    status?: string;

    @Column({nullable: true})
    ativo?: boolean;

    @Column("decimal", { precision: 8, scale: 2 })
    valor?: number;

    @Column({nullable: true})
    dataInscricao?: Date;

    @Column({nullable: true})
    dataPagamento?: Date;


}