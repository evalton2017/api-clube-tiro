import { Filiado } from "../model/filiado.model";
import {createConnection, EntityRepository, getRepository, Repository} from "typeorm";


@EntityRepository(Filiado)
export class FiliadoRepository extends Repository<Filiado>{

}