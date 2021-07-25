import * as HttpStatus from 'http-status';
import Helper from '../util/helper';
import pessoaService from '../services/pessoaService';
import { Pessoa } from '../model/pessoa.model';

class PessoaController {
    
    async create(req:any,res:any) {
            let pessoa: Pessoa = new Pessoa();
            pessoa = req.body;
            pessoaService.create(pessoa)
            .then(sucesso => Helper.sendResponse(res, HttpStatus.OK, sucesso))
            .catch(error => res.send(console, `Error ${error}`));
         
    }

    getPessoas(req:any,res:any) { 
        pessoaService.getPessoas()
            .then(pessoas => Helper.sendResponse(res, HttpStatus.OK, pessoas))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    getPessoaPorEmail(req:any,res:any) { 
        let email = req.params.email;
        pessoaService.getPessoaByEmail(email)
            .then(pessoa => Helper.sendResponse(res, HttpStatus.OK, pessoa))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    async update(req:any,res:any) {
        let pessoa: Pessoa;
        pessoa = new Pessoa();
        pessoa = req.body;
        pessoaService.update(pessoa)
        .then(sucesso => Helper.sendResponse(res, HttpStatus.OK, sucesso))
        .catch(error => res.send(console, `Error ${error}`));
     
    }

    setCustom(req:any, res:any){
        let dados = req.body;
        const filiado = 'Filiado';
        console.log(dados);
        pessoaService.setCustom(dados.email, filiado)
            .then(pessoa => Helper.sendResponse(res, HttpStatus.OK, pessoa))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    setAdmin(req:any, res:any){
        let email = req.params.email;
        console.log(email);
        pessoaService.setAdmin(email, 'filiado')
            .then(pessoa => Helper.sendResponse(res, HttpStatus.OK, pessoa))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    enviarEmail(req:any, res:any){
        let email = req.body;
        try{
            pessoaService.emailContato(email)
            Helper.sendResponse(res, HttpStatus.OK, 'Email enviado com sucesso!');
        }catch(error){
            Helper.sendResponse(res, HttpStatus['422_MESSAGE'], 'Erro ao enviar o Email');
            console.log(error)
        }
        
    }
    

}


export default new PessoaController();