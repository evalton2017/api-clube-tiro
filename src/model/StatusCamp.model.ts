import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StatusCamp {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    descricao?: string;

}
  