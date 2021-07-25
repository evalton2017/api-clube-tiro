import Auth from '../firebase-auth';
import { AppLogger } from '../util/appLogger';

class LoginService {
 
  createUserLogin(email:string, password:string){
    Auth.SignInwithWmailAndPassword(email, password).then(
      (login) => {
        if (!login.hasOwnProperty('err')) {
          AppLogger.info(`Login realizado, usuario ${email}`)
        } else {
          AppLogger.error(`usuario ou senha invalido ${email}`)
        }
      });
  }
 
  async verificaRules(email: any){
    return Auth.verificaPerfil(email).then((retorno)=>{
      return retorno;
    }).catch((error)=>{
      AppLogger.error(error);
    })
  }

  async setUserLogado(user: any, userLogado: any){
    userLogado.token = user.user.stsTokenManager.accessToken;
    userLogado.email = user.user.email;
    userLogado.uid = user.user.uid;
    userLogado.rules = [await this.verificaRules(userLogado.email)];
    return userLogado;
  }


}

export default new LoginService();
