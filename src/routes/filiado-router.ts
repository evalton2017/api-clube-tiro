import filiadoController from "../controllers/filiado-controller";
import pessoaController from "../controllers/pessoa-controller";
import * as express from "express";
import uploads from "../util/upload";

const filiadoRouter = express.Router();

   //ROTA PARA RESETAR PASSWORD
   filiadoRouter.route('/buscar/:email').get(filiadoController.getFiliadoPorEmail);

   //ROTA PARA REALIZAR LOGIN
   filiadoRouter.route('/pessoa').get(pessoaController.getPessoas);

   //SALVA OS DADOS PESSOAIS
   filiadoRouter.route('/pessoa/atualizar').post(pessoaController.update);

   //RECUPERA O FILIADO POR EMAIL
   filiadoRouter.route('/buscapessoa/:email').get(pessoaController.getPessoaPorEmail);

   //CRIA OU SALVA FILIADO
   filiadoRouter.route('/cadastrar').post(filiadoController.create);

   //SOLICITAR REQUERIMENTO COMPRA ARMA E ACESSORIOS
   filiadoRouter.route('/solicitar/requerimento/arma').post(filiadoController.solicitarRequerimentoArma);

   //BUSCA REQUERIMENTO POR FILIADO
   filiadoRouter.route('/buscar/requerimento/arma/:id').get(filiadoController.buscarRequerimentosPorFiliado);

   //ANEXAR FOTO
   filiadoRouter.route('/upload/foto/:id').post(uploads.single("file"),filiadoController.uploadFotoPerfil);

   //RETORNA FOTO DO PERFIL
   filiadoRouter.route("/foto/url/:id").get(filiadoController.getUrlCamp) 

   //ANEXAR FOTO
   filiadoRouter.route('/campeonato/inscricao').post(filiadoController.inscricaoCampeonato);

   //Enviar Email 
   filiadoRouter.route("/contato/email").post(pessoaController.enviarEmail)  


export default filiadoRouter;
