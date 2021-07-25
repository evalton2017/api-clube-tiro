import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { InscricaoCamp } from "./inscricaoCamp.model";
import { Modalidade } from "./modalidade.model";

@Entity()
export class Campeonato {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column({length:200})
    nome?: string;

    @Column({length:200, nullable: true})
    foto?: string;

    @Column()
    inicio?: Date;

    @Column()
    fim?: Date;

    @Column()
    temporada?: string;

    @Column("decimal", { precision: 8, scale: 2 })
    valor?: number;

    @ManyToMany(type => Modalidade, {cascade: true})
    @JoinTable()
    modalidades?: Modalidade[];

    @OneToMany(type => InscricaoCamp, inscricao => inscricao.campeonato,{nullable: true})
    inscricoes?: InscricaoCamp[];

    
}

