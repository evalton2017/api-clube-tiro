import LoginController from "../controllers/login-controller";
import * as express from "express";
import pessoaController from "../controllers/pessoa-controller";

const loginRouter = express.Router();

   //ROTA PARA RESETAR PASSWORD
   loginRouter.route('/reset/password/:email').post(LoginController.sendPasswordResetEmail);

   //ROTA PARA REALIZAR LOGIN
   loginRouter.route('/login').post(LoginController.signInwithWmailAndPassword);

   //ROTA PARA CRIAR USUARIO
   loginRouter.route('/login/createUser').post(LoginController.sigUpWithWmailAndPassword);

   //RECUPERA O PERFIL DO USUARIO
   loginRouter.route('/login/rules').post(LoginController.verificaRules);

   loginRouter.route("/login/cadastrar").post(pessoaController.create)

export default loginRouter;
