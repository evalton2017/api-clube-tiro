import {Filiado} from "../model/filiado.model";
import { getCustomRepository, getRepository } from "typeorm";
import {FiliadoRepository} from "../repository/filiado-repository";
import Auth from '../firebase-auth';
import { AppLogger } from "../util/appLogger";
import { Requerimento } from "../model/requerimento.model";
import { getManager } from 'typeorm';
import uploadService from "./upload-service";
import { InscricaoCamp } from "../model/inscricaoCamp.model";


class FiliadoService{

    erro:any;

    async getFiliados() {
        const repository = getCustomRepository(FiliadoRepository);
        return repository.find({relations:["pessoa","endereco","telefones", ]});
    }

    async getFiliadoPorEmail(email:string){
         return  getRepository(Filiado)
        .createQueryBuilder("filiado") .leftJoinAndSelect("filiado.pessoa", "pessoa") 
        .leftJoinAndSelect("filiado.endereco", "endereco") 
        .leftJoinAndSelect("filiado.telefones", "telefones")  
        .leftJoinAndSelect("pessoa.perfis", "perfis") 
        .leftJoinAndSelect("filiado.inscricoes", "inscricoes")   
        .leftJoinAndSelect("inscricoes.campeonato", "campeonato")         
        .where("pessoa.email= :email", { email: email }) 
        .getOne();

    }

    buscarFiliados(){  
        return  getRepository(Filiado)
            .createQueryBuilder("filiado") .leftJoinAndSelect("filiado.pessoa", "pessoa") 
            .leftJoinAndSelect("filiado.endereco", "endereco") 
            .leftJoinAndSelect("filiado.telefones", "telefones")  
            .leftJoinAndSelect("pessoa.perfis", "perfis")         
            .where("perfis.nome= 'Filiado'") 
            .getMany();
       
    }

    async buscarCompetidores(){
        let competidores =   getRepository(Filiado)
            .createQueryBuilder("filiado") .leftJoinAndSelect("filiado.pessoa", "pessoa") 
            .leftJoinAndSelect("filiado.endereco", "endereco") 
            .leftJoinAndSelect("filiado.telefones", "telefones")  
            .leftJoinAndSelect("pessoa.perfis", "perfis")         
            .where("perfis.nome= 'Competidor'") 
            .getMany();    
            
            competidores.then((res)=>{
                console.log(res)
            })

            return competidores;
    }

    async create(filiado: any) {
        const repository = getCustomRepository(FiliadoRepository);
        return repository.save(filiado);
    }

    async solicitarRequerimentoArma(requerimento: any) {
        const repository = getRepository(Requerimento);
        return repository.save(requerimento);
    }

    
    buscarRequerimentosPorFiliado(idFiliado: any){
        let requerimento =  getRepository(Requerimento)
            .createQueryBuilder("requerimento") .leftJoinAndSelect("requerimento.filiado", "filiado")
            .leftJoinAndSelect("filiado.pessoa", "pessoa") 
            .leftJoinAndSelect("filiado.endereco", "endereco") 
            .leftJoinAndSelect("filiado.telefones", "telefones")     
            .setParameters({ id_filiado: idFiliado })
            .where("filiado.id= :id_filiado")
            .getMany();   
            
            return requerimento;
    }

    buscarRequerimento(idRequerimento: any){
        let requerimento =  getRepository(Requerimento)
            .createQueryBuilder("requerimento") .leftJoinAndSelect("requerimento.filiado", "filiado")
            .leftJoinAndSelect("filiado.pessoa", "pessoa") 
            .leftJoinAndSelect("filiado.endereco", "endereco") 
            .leftJoinAndSelect("filiado.telefones", "telefones")      
            .setParameters({ id_req: idRequerimento })
            .where("requerimento.id= :id_req")
            .getOne();   
       
            return requerimento;
    }

    buscarRequerimentos(){
        let requerimento =  getRepository(Requerimento)
            .createQueryBuilder("requerimento") .leftJoinAndSelect("requerimento.filiado", "filiado")
            .leftJoinAndSelect("filiado.pessoa", "pessoa") 
            .leftJoinAndSelect("filiado.endereco", "endereco") 
            .leftJoinAndSelect("filiado.telefones", "telefones")     
            .getMany();   
            
            return requerimento;
    }
    
    async getRequerimentoArma() {
        const repository = getRepository(Requerimento);
        return repository.find({relations:["filiado"]});
    }

    async ativarFiliado(email: any) {
        const filiadoRepository = getRepository(Filiado);
        return Auth.ativarFiliado(email).then(
            (login) => {
                let filiado = this.getFiliadoPorEmail(email);
                filiado.then((resposta)=>{
                    resposta!.ativo = true;
                    filiadoRepository.save(resposta!);
                    AppLogger.json("filiado Ativado "+resposta?.pessoa?.nome)                   
                }).catch((erro)=>{
                    AppLogger.error(erro);
                    return erro;
                })
                return login;
            }).catch((erro)=>{
                AppLogger.error(erro);
                return erro;
            });
    }

    desativarFiliado(email: any) {
        const filiadoRepository = getRepository(Filiado);
        return Auth.desativarFiliado(email).then(
            (login) => {
                let filiado = this.getFiliadoPorEmail(email);
                filiado.then((resposta)=>{
                    resposta!.ativo = false;
                    filiadoRepository.save(resposta!);
                    AppLogger.json("filiado Desativado "+resposta?.pessoa?.nome)                   
                }).catch((erro)=>{
                    AppLogger.error(erro);
                    return erro;
                })
                return login;
            }).catch((erro)=>{
                AppLogger.error(erro);
                return erro;
            });
    }

    async buscaQuantidadeFiliado(){
        const entityManager =  getManager();
        const quantidade = entityManager.query(
            `select COUNT(p.id) as quantidade from pessoa as p inner join perfil as pe on pe."pessoaId" = p.id where pe.nome ='Filiado'`
        )
        return quantidade;

    }

    async buscaQuantidadeCompetidor(){
        const entityManager =  getManager();
        const quantidade = entityManager.query(
            `select COUNT(p.id) as quantidade from pessoa as p inner join perfil as pe on pe."pessoaId" = p.id where pe.nome ='Competidor'`
        )
        return quantidade;

    }

    async uploadImagem(imagem: any, id: any, callback: any) {
        try {
            let repository =  getRepository(Filiado);
            let filiado =  repository.findOne({ id: id });
            uploadService.imageUpload(imagem, (codigo: any) => {
                filiado.then((fl)=>{
                    fl!.foto = codigo;
                    repository.save(fl!);
                });               
                AppLogger.json(filiado); 
                callback(filiado);
            });
            
        } catch (error) {
            AppLogger.error(error);
            callback(error);        
        }
    }

    async inscricaoCampeonato(insricao: any){
        try{
            let repository = getRepository(InscricaoCamp);
            return repository.save(insricao);       
        }catch(error){
            console.log(error)
        }
 
    }

   
}

export default new FiliadoService();