import { Campeonato } from "../model/campeonato.model";
import { getCustomRepository, getRepository } from "typeorm";
import { Modalidade } from "../model/modalidade.model";
import { Divisao } from "../model/divisao.model";
import { Arma } from "../model/arma.model";
import { Categoria } from "../model/categoria.model";
import { CampeonatoRepository } from "../repository/campeonato-repository";
import uploadService from "./upload-service";
import { InscricaoCamp } from "../model/inscricaoCamp.model";


class CampeonatoService {

    async getCampeonatos() {
        let hoje = new Date();
         let campeonatos = await getRepository(Campeonato)
        .createQueryBuilder("campeonato") .leftJoinAndSelect("campeonato.modalidades", "modalidade")
        .leftJoinAndSelect("modalidade.divisoes", "divisao") 
        .setParameters({ hoje: hoje })
        .where("campeonato.fim > :hoje")
        .getMany();   
        return campeonatos;
    }

    async getInscritos() {
         let inscritos = await getRepository(InscricaoCamp)
        .createQueryBuilder("inscricao_camp") .leftJoinAndSelect("inscricao_camp.campeonato", "campeonato")
        .leftJoinAndSelect("inscricao_camp.filiado", "filiado")
        .leftJoinAndSelect("filiado.pessoa", "pessoa")
        .getMany();   
        return inscritos;
    }

    async create(campeonato: any) {
        const repository = getCustomRepository(CampeonatoRepository);
        return repository.save(campeonato);
    }

    async confirmarPagamento(inscricao: any) {
        const repository = getRepository(InscricaoCamp);
        return repository.save(inscricao);
    }

    async getModalidades() {
        const repository = getRepository(Modalidade)
        let modalidades = repository.find({ relations: ["divisoes"] });
        return modalidades;
    }

    async getDivisoes() {
        const repository = getRepository(Divisao)
        let divisoes = repository.find({ relations: ["categorias", "armas"] });
        return divisoes;
    }

    async getArmas() {
        const repository = getRepository(Arma)
        let armas = repository.find();
        return armas;
    }

    async getCategorias() {
        const repository = getRepository(Categoria)
        let categorias = repository.find();
        return categorias;
    }

    async uploadImagem(imagem: any, id: any, callback: any) {
        try {
            let repository =  getRepository(Campeonato);
            let campeonato =  repository.findOne({ id: id });
            uploadService.imageUpload(imagem, (codigo: any) => {
                campeonato.then((camp)=>{
                    camp!.foto = codigo;
                    repository.save(camp!);
                });                
                callback(campeonato);
            });
            
        } catch (error) {
            console.log(error);
            callback(error);
        }
    }

}

export default new CampeonatoService();