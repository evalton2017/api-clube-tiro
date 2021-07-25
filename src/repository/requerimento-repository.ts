import { Requerimento } from "../model/requerimento.model";
import {createConnection, EntityRepository, getRepository, Repository} from "typeorm";


@EntityRepository(Requerimento)
export class RequerimentoRepository extends Repository<Requerimento>{

}