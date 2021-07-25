import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Endereco{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    bairro?: string;

    @Column()
    cep?: string;

    @Column({nullable: true})
    complemento?: string;
    
    @Column()
    uf?: string;

    @Column()
    numero?: number;
    
    @Column()
    logradouro?: string;
    
    @Column()
    localidade?: string;
    
}