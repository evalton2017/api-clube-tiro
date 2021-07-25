import firebase from 'firebase';
import admin from 'firebase-admin';
import { AppLogger } from './util/appLogger';
import * as serviceAccount from '../config/ServiceAccount.json';


var config = {

};

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url
}

class Auth {
  constructor() {
    AppLogger.configureLogger();
    firebase.initializeApp(config);
    admin.initializeApp({credential: admin.credential.cert(params)})
    const db = admin.firestore()
  }

  //METODO RESPONSAVEL POR CRIAR O USUARIO NO FIREBASE
  async SigUpWithWmailAndPassword(email: any, password: any) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return JSON.stringify(user);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/wek-password') {
          return { err: errorCode };
        } else {
          return { err: errorMessage };
        }
        return { err: error };
      });
  }

  //SETA O CUSTOM NO USUARIO 
 async setCustomUserClaimms(uid:any, tipo: any){
    switch(tipo){
      case 'Filiado':{
        admin.auth().setCustomUserClaims(uid, {Filiado: true, Ativo:false})
        break;
      }
      case 'Competidor':{
        admin.auth().setCustomUserClaims(uid, {Competidor: true, Ativo: true})
        break;
      }
    }
   
  }

  async setarAdmin(email:any, tipo: any){
    admin.auth().getUserByEmail(email)
    .then((user)=>{
      console.log(user.uid)
       return  admin.auth().setCustomUserClaims(user.uid, {Admin: true, Ativo:true})
    }).catch(function (error) {
        console.log(error)
    });
   
  }

  //VERIFICA O CUSTOM DO USUARIO
  async verificaClaim(uid:any){
    let retorno;
    return admin.auth().getUser(uid)
    .then((userRecord)=>{
       AppLogger.info(userRecord);
       return userRecord;
    }).catch(function (error) {
        console.log(error)
        return null;
    });
  }

  async retornaPerfil(uid:any){
    let retorno;
    return admin.auth().getUser(uid)
    .then((userRecord)=>{
       AppLogger.info(userRecord.customClaims);
       return userRecord.customClaims;
    }).catch(function (error) {
        console.log(error)
        return null;
    });
  }

  //retorno usuario com perfil
  async verificaPerfil(email:any){
    return admin.auth().getUserByEmail(email)
    .then((user)=>{
       return this.retornaPerfil(user.uid);
    }).catch(function (error) {
        console.log(error)
    });
  }

  //RETORNA DADOS DO USUARIO PASSANDO O EMAIL
   async getUserByEmail(email:any, perfil:any){
    return admin.auth().getUserByEmail(email)
    .then((user)=>{
       this.setCustomUserClaimms(user.uid,perfil);    
       return this.verificaClaim(user.uid);
    }).catch(function (error) {
        console.log(error)
    });
  }

   //ATIVA O FILIADO 
   async ativarFiliado(email:any){
    return admin.auth().getUserByEmail(email)
    .then((user)=>{  
      admin.auth().setCustomUserClaims(user.uid, {Filiado: true, Ativo:true});
      return user;
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return { err: error };
    });
  }

  //desativa o filiado
  async desativarFiliado(email:any){
    return admin.auth().getUserByEmail(email)
    .then((user)=>{  
      admin.auth().setCustomUserClaims(user.uid, {Filiado: true, Ativo:false});
      return user;
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return { err: error };
    });
  }

  //REALIZA A AUTENTICAÇÃO DO USUARIO 
  async SignInwithWmailAndPassword(email: any, password: any) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user)=>{
        return JSON.stringify(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return { err: errorMessage };
      });
  }

  //REALIZAR O RESETE DE SENHA DO USUARIO
  SendPasswordResetEmail(email: any) {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        return { err: errorMessage, code: errorCode }
      });
  }

  //INSERI OS DADOS DO USUARIO NO FIREBASE
  insertUserData(name: any) {
    console.log(name);
    return firebase
      .database()
      .ref('users')
      .push({
        name,
      })
      .then(function () {
        console.log('Synchronization succes');
      })
      .catch(function (error) {
        console.log('Synchronization failed');
      });
  }

  //METODO PARA REALIZAR AUTORIZAÇÃO 
  validate(req: any, res: any, next:any){
    var token = req.headers['authorization']; 
    if(token){
      admin.auth().verifyIdToken(token).then((result)=>{
        next();
      }).catch((error)=>{
        return res.status(401).send({
          success:false,
          message:'401- unathorized'
        })
      })
    }else{
      return res.status(401).send({
          success:false,
          message:'401- unathorized'
      })
    }

  }

}

export default new Auth();
