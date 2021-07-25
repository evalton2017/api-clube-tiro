import "reflect-metadata";
import {createConnection} from "typeorm";
import { AppLogger } from "./appLogger";

const DB = 'd8j1nbkk4fkpov';
const USERNAME= 'smaiiphxxcfveq';
const PASSWORD='0dc38d027df71be96adf67b3dcb000a9b1ffd8ecabde9fe876e345f7db5d8baa';
const HOST='ec2-54-152-40-168.compute-1.amazonaws.com';
//CONFIGURAÇÕES LOCAL
const hostLocal='localhost'

class Database{

  createConnection(){
    createConnection({
      type: "postgres",
      host: hostLocal,
      port: 5432,
      username: USERNAME,
      password: PASSWORD,
      database: DB,
      entities: [
        `${__dirname}/../**/*.model.{ts,js}`
      ],
      synchronize: true,
      logging: false
    }).then(connection => {
      AppLogger.info("Criando/atualizando tabelas no banco")
    }).catch((error) => {
      AppLogger.error(error);
    });

  }

}

export default Database;
