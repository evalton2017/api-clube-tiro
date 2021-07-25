import * as fs from 'fs';
import * as readline from 'readline';
import { google } from 'googleapis';
import * as credentials from '../../config/credentials.json';
import { Authenticate } from '../model/authenticate';
import * as token from '../../config/token.json';
import { AppLogger } from '../util/appLogger';

const params = {
    client_id: credentials.client_id,
    project_id: credentials.project_id,
    auth_uri: credentials.auth_uri,
    token_uri: credentials.token_uri,
    auth_provider_x509_cert_url: credentials.auth_provider_x509_cert_url,
    client_secret: credentials.client_secret,
    redirect_uris: credentials.redirect_uris[0]
}

const access = {
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    scope: token.scope,
    token_type: token.token_type,
    expiry_date: token.expiry_date
}

let authi: any;

class UploadArquivo {

    SCOPES = ['https://www.googleapis.com/auth/drive'];
    TOKEN_PATH = 'config/token.json';
    authenticate: Authenticate = new Authenticate();

    constructor() {
        fs.readFile('config/credentials.json', (err, content: any) => {
            if (err) return console.log('Erro ao ler o arquivo json:', err);
            this.authorize(JSON.parse(content), this.setToken);
        });
    }

    authorize(credent: any, callback: any) {
        const { client_secret, client_id, redirect_uris } = params;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
        fs.readFile(this.TOKEN_PATH, (err, token: any) => {
            if (err) return this.getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

    getNewToken(oAuth2Client: any, callback: any) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Entre com o codigo de acesso a api drive: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err: any, token: any) => {
                if (err) return console.error('Error retrieving access token', err);
                console.log(err);
                oAuth2Client.setCredentials(token);
                fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log('Token foi armazenado no arquivo ', this.TOKEN_PATH);
                })
                callback(oAuth2Client);
            });
        });
    }

    setToken(auth: any) {
        authi = auth;
    }

    listarFiles(auth: any, pageToken: any) {
        const drive = google.drive({ version: 'v3', auth });
        drive.files.list({
            corpora: 'user',
            pageSize: 10,
            //q: "name='elvis233424234'",
            pageToken: pageToken ? pageToken : '',
            fields: 'nextPageToken, files(*)',
        }, (err: any, res: any) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            if (files.length) {
                files.forEach((file: any) => {
                   //console.log(file.name + '|' + file.size + '|' + file.createdTime + '|' + file.modifiedTime);
                    console.log(file);
                });
                if (res.data.nextPageToken) {
                    this.listarFiles(drive, res.data.nextPageToken);
                }
            } else {
                console.log('No files found.');
            }
        });

    }

    async getFile(file: any, callback: any) {
        let auth = authi;
        let url;
        const drive = google.drive({ version: 'v3', auth });
        drive.files.get({ fileId: file, fields: '*' }, (err: any, res: any) => {
            if (err) return console.log('Erro ao tentar recuperar arquivo: ' + err);
            url = res.data.thumbnailLink;
            callback(url);
        });
    }

    async imageUpload(imagem: any, callback: any) {
        let auth = authi;
        let codigo;
        try {
            const drive = google.drive({ version: 'v3', auth });
            const fileMetadata = {
                'name': `${imagem.originalname}`
            };
            const media = {
                mimeType: imagem.mimetype,
                body: fs.createReadStream(`uploads/${imagem.originalname}`)
            };

            drive.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: 'id'
            }, (err: any, file: any) => {
                if (err) {
                    console.error(err);
                    return err;
                } else {
                    fs.unlinkSync(`uploads/${imagem.originalname}`);
                    codigo = file.data.id;
                    callback(codigo);
                }
            });
        } catch (error) {
            AppLogger.error(error);
            callback(error);
        }

    }

}

export default new UploadArquivo();
