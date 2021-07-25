import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Status {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    descricao?: string;

}
  