import {getCustomRepository, getRepository } from 'typeorm';
import {AppLogger } from '../util/appLogger';
import Auth from '../firebase-auth';
import { Pessoa } from '../model/pessoa.model';
import {PessoaRepository} from '../repository/pessoa-repository';
import * as nodemailer from 'nodemailer';

class PessoaService{
   
    erro:any;

    transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'ctmclube@gmail.com',
            pass:'ctm@293847'
        }
    });

    async getPessoas() {
        const repository = getCustomRepository(PessoaRepository);
        return repository.find({relations:["perfis"]});
    }

    async getPessoaByEmail(email:string): Promise<Pessoa | undefined> {
        const repository = getCustomRepository(PessoaRepository);
        return  repository.findOne({email:email},{relations:["perfis"]});
    }

    async create(pessoa: any) {
        return this._cadastrarLoginFirebase(pessoa);
    }

    async update(pessoa: any) {
        const repository = getCustomRepository(PessoaRepository); 
        return repository.save(pessoa)
    }

    async _cadastrarLoginFirebase(pessoa: any) {
        const repository = getRepository(Pessoa);
        return Auth.SigUpWithWmailAndPassword(pessoa.email, pessoa.password).then(
            (login) => {
                this.erro = login;
                if (!login.hasOwnProperty('err')) {  
                    repository.save(pessoa);    
                    AppLogger.info("cadastrando login do usuario "+pessoa.nome);
                    this.setCustom(pessoa.email, pessoa.perfis[0].nome);
                    return  "Usuario cadastrado com Sucesso";
                } else {
                   AppLogger.error(this.erro.err);
                   return this.erro.err;
                }
            }).catch((erro)=>{
                AppLogger.error(erro);
                return erro;
            });
    }

    async setCustom(email: string, custom:any){
        return await Auth.getUserByEmail(email, custom);        
    }

    async setAdmin(email: string, custom:any){
        return await Auth.setarAdmin(email, custom);        
    }

    adicionarMinutos(data:any, minutos:any) {
        return new Date(data.getTime() + minutos * 60000);
   }

   emailContato(email: any){
        let mailOptions = {
        from: email.email,
        to:   'duke.ndsg@gmail.com',
        subject: email.assunto +' - Enviado pelo usuario '+email.email,
        text: email.mensagem
       };

      this.transporter.sendMail(mailOptions, function (err, info) {
              if (err) {
                console.log(err);    
              }
              else {
                  console.log('email enviado');
              }
          }) 
   }
}

export default new PessoaService();