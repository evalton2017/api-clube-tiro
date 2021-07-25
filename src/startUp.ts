import bodyParser, { json, urlencoded } from 'body-parser';
import express from 'express';
import { AppLogger } from './util/appLogger';
import compression from 'compression';
import DataBase from './util/db';
import * as cors from 'cors';
import loginRouter from './routes/login-router';
import Auth from './firebase-auth';
import PessoaController from './controllers/pessoa-controller';
import FiliadoController from './controllers/filiado-controller';
import adminController from './controllers/admin-controller';
import filiadoRouter from './routes/filiado-router';
import uploads from './util/upload';

class StartUp {
  public app: express.Application;
  private _db: DataBase;

  constructor() {
    this.app = express();
    this._db = new DataBase();
    this._db.createConnection();
    this.configureMiddleware();
    this.routes();
  }

  routes() {
    // this.app.route("/api/pessoa/setarAdmin/:email").get(PessoaController.setAdmin)
    //rota para login sem validação de rota
    this.app.route("/api/download/log/:arquivo").get(adminController.baixarlog);
    this.app.route("/api/buscaCep/:cep").get(FiliadoController.buscaCep)
    this.app.route("/api/site/campeonatos").get(adminController.getCampeonatos)   
    this.app.route("/api/site/campeonatos/url/:id").get(adminController.getUrlCamp)    
    this.app.use("/api", loginRouter);      
    //Inicio rotas protegitas com token
    this.app.use(Auth.validate);
    //ROTAS FILIADO
    this.app.use("/api/filiado", filiadoRouter);  
    //ROTAS ADMIN
    this.app.route("/api/admin/filiados").get(adminController.getFiliados)
    this.app.route("/api/admin/competidores").get(adminController.getCompetidores)
    this.app.route("/api/admin/filiado/ativar/:email").get(adminController.ativarFiliado)
    this.app.route("/api/admin/filiado/desativar/:email").get(adminController.desativarFiliado)
    this.app.route("/api/admin/requerimentos").get(adminController.buscarRequerimentos)
    this.app.route("/api/admin/requerimento/:id").get(adminController.buscarRequerimento)
    this.app.route("/api/admin/quantidade/filiado").get(adminController.buscaQuantidadeFiliado)
    this.app.route("/api/admin/quantidade/competidor").get(adminController.buscaQuantidadeCompetidor)
    //ROTAS CAMPEONATO ADMIN
    this.app.route("/api/admin/campeonatos").get(adminController.getCampeonatos)
    this.app.route("/api/admin/campeonato/cadastrar").post(adminController.salvarCampeonato)
    this.app.route("/api/admin/upload/campeonato/:id").post(uploads.single("file"), adminController.uploadImagemCampeonato)
    this.app.route("/api/admin/modalidades").get(adminController.getModalidades)
    this.app.route("/api/admin/divisoes").get(adminController.getDivisoes)
    this.app.route("/api/admin/categorias").get(adminController.getCategorias)
    this.app.route("/api/admin/armas").get(adminController.getArmas)   
    this.app.route("/api/admin/inscritos").get(adminController.getInscritos) 
    this.app.route("/api/admin/inscritos/confirmar-pagamento").post(adminController.confirmarPagamento)   


    //ROTAS SECRETARIA
    this.app.route("/api/login/roles").post(PessoaController.setCustom)

  }

  private configureMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(json({ limit: '50mb' }));
    this.app.use(compression());
    this.app.use(urlencoded({ limit: '50mb', extended: true }));
   // this.app.use(cors())
    this.enableCors();
    AppLogger.configureLogger();
  }

  enableCors(){
      const options: cors.CorsOptions = {  
        methods: "GET,OPTIONS,PUT,POST,DELETE",
        origin: "*",
    }
    this.app.use(cors.default(options));

  }

}

export default new StartUp();
