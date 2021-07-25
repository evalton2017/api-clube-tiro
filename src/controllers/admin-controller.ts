import helper from "../util/helper";
import httpStatus from "http-status";
import filiadoService from "../services/filiadoService";
import { Filiado } from "../model/filiado.model";
import campeonatoService from "../services/campeonato-service";
import { Campeonato } from "../model/campeonato.model";
import uploadService from "../services/upload-service";
import path = require('path');
import { AppLogger } from "../util/appLogger";

interface Endereco{
    bairro: string;
    cep: string;
    complemento: string;
    numero: string;
    uf: string;
    logradouro: string;
    localidade: string;
}


class AdminController{
       
    async create(req:any,res:any) {
            let filiado: Filiado = new Filiado();
            filiado  = req.body;
            filiadoService.create(filiado)
            .then(sucesso => helper.sendResponse(res, httpStatus.OK, sucesso))
            .catch(error => res.send(console, `Error ${error}`));
        
    }

    async getFiliados(req:any,res:any) { 
        await filiadoService.buscarFiliados()
            .then((filiados: any) => helper.sendResponse(res, httpStatus.OK, filiados))
            .catch((error: any) => console.error.bind(console, `Error ${error}`));
    }

    async getCompetidores(req:any,res:any) { 
        await filiadoService.buscarCompetidores()
            .then((filiados: any) => helper.sendResponse(res, httpStatus.OK, filiados))
            .catch((error: any) => console.error.bind(console, `Error ${error}`));
    }

    getFiliadoPorEmail(req:any,res:any) { 
        let email = req.params.email;
        filiadoService.getFiliadoPorEmail(email)
            .then((filiado: any) => helper.sendResponse(res, httpStatus.OK, filiado))
            .catch((error: any) => console.error.bind(console, `Error ${error}`));
    }

    ativarFiliado(req:any,res:any) { 
        let email = req.params.email;
        filiadoService.ativarFiliado(email)
          .then((retorno)=> {
              res.status(200).send({
                  message:"Filiado ativado com sucesso!"
              })
          })
          .catch(error => {
              res.status(422).send({
                  message: error
              })
          });
    }

    
    buscarRequerimentos(req:any,res:any) { 
        filiadoService.buscarRequerimentos()
            .then((filiado: any) => helper.sendResponse(res, httpStatus.OK, filiado))
            .catch((error: any) => console.error.bind(console, `Error ${error}`));
    }

    buscarRequerimento(req:any,res:any) { 
        let id = req.params.id;
        filiadoService.buscarRequerimento(id)
            .then((filiado: any) => helper.sendResponse(res, httpStatus.OK, filiado))
            .catch((error: any) => console.error.bind(console, `Error ${error}`));
    }

    desativarFiliado(req:any,res:any) { 
        let email = req.params.email;
        filiadoService.desativarFiliado(email)
        .then((retorno)=> {
            res.status(200).send({
                message:"Filiado ativado com sucesso!"
            })
        })
        .catch(error => console.error.bind(console, `Error ${error}`));
    }

    buscaQuantidadeFiliado(req:any,res:any) { 
        filiadoService.buscaQuantidadeFiliado()
            .then((quantidade: any) => helper.sendResponse(res, httpStatus.OK, quantidade))
            .catch((error: any) => console.error.bind(console, `Error ${error}`));
    }

    buscaQuantidadeCompetidor(req:any,res:any) { 
        filiadoService.buscaQuantidadeCompetidor()
            .then((competidor: any) => helper.sendResponse(res, httpStatus.OK, competidor))
            .catch((error: any) => console.error.bind(console, `Error ${error}`));
    }

    //CAMPEONATO
    async getCampeonatos(req:any,res:any) { 
        await campeonatoService.getCampeonatos()
        .then((retorno)=> {
            res.status(200).send({
              retorno
            })
        })
        .catch(error => console.error.bind(console, `Error ${error}`));
    }

    async getInscritos(req:any,res:any) { 
        await campeonatoService.getInscritos()
        .then((retorno)=> {
            res.status(200).send({
              retorno
            })
        })
        .catch(error => console.error.bind(console, `Error ${error}`));
    }

    async salvarCampeonato(req:any,res:any) {
        let campeonato: Campeonato = new Campeonato();
        campeonato = req.body;
        await campeonatoService.create(campeonato)
        .then((retorno)=> {
            res.status(httpStatus.NO_CONTENT).send({
              retorno
            })
        })
        .catch((error)=>{
            console.log(error);
            res.status(httpStatus["500_MESSAGE"])
        });
     
    }

    async getModalidades(req:any,res:any) { 
        await campeonatoService.getModalidades()
        .then((retorno)=> {
            res.status(200).send({
              retorno
            })
        })
        .catch(error => console.error.bind(console, `Error ${error}`));
    }

    async getDivisoes(req:any,res:any) { 
        await campeonatoService.getDivisoes()
        .then((retorno)=> {
            res.status(200).send({
              retorno
            })
        })
        .catch(error => console.error.bind(console, `Error ${error}`));
    }

    async getCategorias(req:any,res:any) { 
        await campeonatoService.getCategorias()
        .then((retorno)=> {
            res.status(200).send({
              retorno
            })
        })
        .catch(error => console.error.bind(console, `Error ${error}`));
    }

    async getArmas(req:any,res:any) { 
        await campeonatoService.getArmas()
        .then((retorno)=> {
            res.status(200).send({
              retorno
            })
        })
        .catch(error => console.error.bind(console, `Error ${error}`));
    }

    async uploadImagemCampeonato(req: any, res: any) {
        let id = req.params.id;
        let imagem = req.file;
        AppLogger.info(imagem);
        try{
            await campeonatoService.uploadImagem(imagem, id, (campeonato: any)=>{
                res.status(202).send({retorno: "Imagem adicionada com sucesso!"});
            });          
        }catch(error){
            console.log(error);
        } 
    }

    async getUrlCamp(req: any, res: any){
        let id = req.params.id;
        try{
            await uploadService.getFile(id, (url: any)=>{
            res.status(202).send({retorno: url});
           })             
        }catch(error){
            console.log(error);
        } 
    }

    async confirmarPagamento(req: any, res: any){
        let inscricao = req.body;
        await campeonatoService.confirmarPagamento(inscricao)
        .then((retorno)=> {
            res.status(httpStatus.NO_CONTENT).send({
              retorno
            })
        })
        .catch((error)=>{
            console.log(error);
            res.status(httpStatus["422_MESSAGE"])
        });
    }

    //baixar log 
    async baixarlog(req: any, res:any){
        let arquivo  = req.params.arquivo;
        //var file = __dirname+`/../../logs/${arquivo}.log`
        res.sendFile(path.join(__dirname+`/logs/${arquivo}.log`));
       // res.download(file);
    }
}

export default new AdminController();