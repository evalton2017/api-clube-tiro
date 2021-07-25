import {EntityRepository, Repository} from "typeorm";
import { Campeonato } from "../model/campeonato.model";


@EntityRepository(Campeonato)
export class CampeonatoRepository extends Repository<Campeonato>{

}