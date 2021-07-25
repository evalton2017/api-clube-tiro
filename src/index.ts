import startUp from './startUp';
import { AppLogger } from './util/appLogger';
import fs = require('fs');

var dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var dir = './logs';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


let port = process.env.PORT || '3050';

startUp.app.listen(port, function () {
  AppLogger.info(`servidor executando na porta ${port}`);
});

