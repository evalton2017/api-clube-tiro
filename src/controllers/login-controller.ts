import { Request, Response } from 'express';
import httpStatus, * as HttpStatus from 'http-status';
import Helper from '../util/helper';
import Auth from '../firebase-auth';
import { AppLogger } from '../util/appLogger';
import loginService from '../services/loginService';
import { UserLogado } from '../model/userLogado';

class LoginController {

  public sendPasswordResetEmail(req: Request, res: Response): void {
    let email = req.params.email;
    Auth.SendPasswordResetEmail(email)
      .then((resposta) => {
        if (resposta==true) {
            console.log('sucesso')
            res.status(httpStatus.NO_CONTENT).send('Redefiniação de senha encaminhada para o email');
        }else{
            res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro, verifique o email e tente novamente!');
        }
      })
      .catch((error)=>{
        res.status(401).send('Erro, verifique o email e tente novamente.'+error)
      })
  }

  public signInwithWmailAndPassword(req: Request, res: Response): void {
    let getBody = req.body;
    Auth.SignInwithWmailAndPassword(getBody.email, getBody.password).then(
      async (login) => {
        if (!login.hasOwnProperty('err')) {
          let userLogado: UserLogado = new UserLogado();
          let user = JSON.parse(login.toString());
          userLogado = await loginService.setUserLogado(user, userLogado);
          Helper.sendResponse(res, HttpStatus.OK, userLogado);
        } else {
          AppLogger.error(`usuario ou senha invalido ${getBody.email}`)
          res.send('Usuario ou senha invalido');
        }
      });
  }

  async verificaRules(req: Request, res: Response){
    let getBody = req.body;
    return await loginService.verificaRules(getBody.email);
  }


  public sigUpWithWmailAndPassword(req: Request, res: Response) {
    let getBody = req.body;
      Auth.SigUpWithWmailAndPassword(req.body.email, req.body.password).then(
        (user) => {
          if (!user.hasOwnProperty('err')) {
            let userData = user;
            userData = userData;
            Auth.insertUserData(userData).then(() => {
            res.send(user)
            });
            res.send(user)
          } else {
            console.log('erro ao executar o login');
            res.redirect('/');
          }
        }
      );
  }

  /*public getUserByEmail(req: Request, res: Response): void {
    let email = req.body;
    Auth.getUserByEmail(email.email).then(
      (user)=>{
        if(user){
          return res.send(user);   
        }else{
          return res.send("Erro")
        }
      });
  }*/


}
export default new LoginController();
