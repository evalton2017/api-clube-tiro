import helper from "../util/helper";
import httpStatus from "http-status";
import filiadoService from "../services/filiadoService";
import axios from 'axios';
import { Requerimento } from "../model/requerimento.model";
import { Filiado } from "../model/filiado.model";
import uploadService from "../services/upload-service";


interface Endereco {
    bairro: string;
    cep: string;
    complemento: string;
    numero: string;
    uf: string;
    logradouro: string;
    localidade: string;
}


class FiliadoController {

    async create(req: any, res: any) {
        let filiado: Filiado = new Filiado();
        filiado = req.body;
        console.log(filiado);
        await filiadoService.create(filiado)
            .then((retorno) => {
                res.status(200).send('Filiado cadastrado com sucesso')
            })
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    getFiliados(req: any, res: any) {
        filiadoService.getFiliados()
            .then(filiados => helper.sendResponse(res, httpStatus.OK, filiados))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    getFiliadoPorEmail(req: any, res: any) {
        let email = req.params.email;
        filiadoService.getFiliadoPorEmail(email)
            .then((filiado: any) => helper.sendResponse(res, httpStatus.OK, filiado))
            .catch((error: any) => console.error.bind(console, `Error ${error}`));
    }

    async solicitarRequerimentoArma(req: any, res: any) {
        let requerimento: Requerimento = new Requerimento();
        requerimento = req.body;
        filiadoService.solicitarRequerimentoArma(requerimento)
            .then((retorno) => {
                res.status(httpStatus.OK).send({
                    message: "Requerimento solicitado com sucesso!"
                })
            })
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    buscarRequerimentosPorFiliado(req: any, res: any) {
        let id = req.params.id;
        filiadoService.buscarRequerimentosPorFiliado(id)
            .then((filiado: any) => helper.sendResponse(res, httpStatus.OK, filiado))
            .catch((error: any) => console.error.bind(console, `Error ${error}`));
    }

    async buscaCep(req: any, res: any) {
        let cep = req.params.cep;
        cep = cep.replace(/\.|\-/g, '');
        const url = `http://viacep.com.br/ws/${cep}/json`;
        await axios.get<Endereco>(url)
            .then(endereco => helper.sendResponse(res, httpStatus.OK, endereco.data))
            .catch(error => console.error.bind(console, `Error ${error}`));

    }

    async uploadFotoPerfil(req: any, res: any) {
        let id = req.params.id;
        let imagem = req.file;
        console.log(imagem);
        
        try{
            await filiadoService.uploadImagem(imagem, id, (filiado: any)=>{
                helper.sendResponse(res, 202, "Inscricao realizada com sucesso!")
            });          
        }catch(error){
            helper.sendResponse(res, 422, error);
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

    async inscricaoCampeonato(req: any, res: any){
        let inscricao = req.body;
        try{
            await filiadoService.inscricaoCampeonato(inscricao)
            helper.sendResponse(res, httpStatus.OK, "Inscricao realizada com sucesso!")
        }catch(error){
            console.log(error);
           res.status(httpStatus["422_MESSAGE"]).send("Erro ao realizar inscricao "+error)
        }
    }


}

export default new FiliadoController();