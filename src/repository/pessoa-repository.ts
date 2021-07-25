import { Pessoa } from "../model/pessoa.model";
import {createConnection, EntityRepository, getRepository, Repository} from "typeorm";


@EntityRepository(Pessoa)
export class PessoaRepository extends Repository<Pessoa>{

}
