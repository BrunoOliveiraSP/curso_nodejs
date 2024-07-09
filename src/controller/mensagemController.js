import { Router } from "express";
const endpoints = Router();


endpoints.get('/helloworld', (req, resp) => {
    // código do endpoint

    resp.send({
        mensagem: 'Hello world!'    
    });
})


endpoints.get('/mensagem/boasvindas', (req, resp) => {
    resp.send({
        mensagem: 'Olá, sejam bem-vindos e bem-vindas!'
    });
})


endpoints.get('/v2/mensagem/boasvindas', (req, resp) => {
    resp.send({
        mensagem: 'Que bom que você está aqui! s2'
    });
})


endpoints.get('/mensagem/ocupado', (req, resp) => {
    resp.send({
        mensagem: 'Estou ocupado no momento.'
    });
})


endpoints.get('/mensagem/ocupado/recado', (req, resp) => {
    resp.send({
        mensagem: 'Estou ocupado, deixe uma mensagem no email xxxxx.'
    });
})


endpoints.get('/mensagem/ola', (req, resp) => {
    if (!req.query.nome) {
        resp.status(400).send({
            erro: 'O parâmetro query (nome) é obrigatório.'
        })
        return;
    }

    let pessoa = req.query.nome ?? 'você';

    resp.send({
        mensagem: 'Olá ' + pessoa
    });
})



export default endpoints;