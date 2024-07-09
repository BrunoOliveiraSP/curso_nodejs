import express from 'express';

const servidor = express();


servidor.get('/helloworld', (req, resp) => {
    // código do endpoint
    resp.send('Hello world!!! =))');
})



servidor.listen(
    5001,
    () => console.log('---> API subiu com sucesso na porta 5001!'));