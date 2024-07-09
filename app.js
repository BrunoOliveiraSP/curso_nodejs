import express from 'express';
import cors from 'cors';
import multer from 'multer';

const servidor = express();
servidor.use(express.json());
servidor.use(cors());


let uploadPerfil = multer({ dest: './storage/perfil' })


servidor.use('/storage/perfil', express.static('./storage/perfil'))
servidor.use('/storage/album', express.static('./storage/album'))



servidor.get('/helloworld', (req, resp) => {
    // código do endpoint

    resp.send({
        mensagem: 'Hello world!'    
    });
})


servidor.get('/mensagem/boasvindas', (req, resp) => {
    resp.send({
        mensagem: 'Olá, sejam bem-vindos e bem-vindas!'
    });
})


servidor.get('/v2/mensagem/boasvindas', (req, resp) => {
    resp.send({
        mensagem: 'Que bom que você está aqui! s2'
    });
})


servidor.get('/mensagem/ocupado', (req, resp) => {
    resp.send({
        mensagem: 'Estou ocupado no momento.'
    });
})


servidor.get('/mensagem/ocupado/recado', (req, resp) => {
    resp.send({
        mensagem: 'Estou ocupado, deixe uma mensagem no email xxxxx.'
    });
})


servidor.get('/calculadora/somar/:n1/:n2', (req, resp) => {
    if (isNaN(req.params.n1) || isNaN(req.params.n2)) {
        resp.status(400).send({
            erro: 'Os parâmetros devem ser números.'
        })
        return;
    }


    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let soma = n1 + n2;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2
        },
        soma: soma
    });

})


servidor.get('/calculadora/somar2', (req, resp) => {
    let n1 = Number(req.query.num1);
    let n2 = Number(req.query.num2);
    let soma = n1 + n2;

    resp.send({
        soma: soma
    });
})


servidor.get('/mensagem/ola', (req, resp) => {
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


servidor.post('/media', (req, resp) => {
    let n1 = req.body.nota1;
    let n2 = req.body.nota2;
    let n3 = req.body.nota3;

    let media = (n1 + n2 + n3) / 3;

    resp.send({
        media: media
    });
})


servidor.post('/dobros', (req, resp) => {
    let nums = req.body.numeros;

    let nums2 = [];
    for (let i = 0; i < nums.length; i++) {
        nums2[i] = nums[i] * 2;
    }

    resp.send({
        numeros: nums,
        dobros: nums2
    });
})


servidor.post('/loja/pedido', (req, resp) => {
    let total = req.body.total;
    let parcelas = req.body.parcelas;
    let cupom = req.query.cupom;

    if (parcelas > 1) {
        let juros = total * 0.05;
        total += juros;
    }

    if (cupom == 'QUERO100') {
        total -= 100;
    }

    let valorParcela = total / parcelas;

    resp.send({
        total: total,
        valorParcela: valorParcela
    });
})



servidor.post('/loja/pedido/completo', (req, resp) => {
    try {
        if (!req.body.parcelas || isNaN(req.body.parcelas)) throw new Error('O parâmetro parcela está inválido.')
        if (!req.body.itens) throw new Error('O parâmetro itens está inválido.')
        

        let parcelas = req.body.parcelas;
        let itens = req.body.itens;
        let cupom = req.query.cupom;

        let total = 0;
        for (let produto of itens) {
            total += produto.preco
        }

        if (parcelas > 1) {
            let juros = total * 0.05;
            total += juros;
        }


        if (cupom == 'QUERO100') {
            total -= 100;
        }

        let valorParcela = total / parcelas;

        resp.send({
            total: total,
            qtdParcelas: parcelas,
            valorParcela: valorParcela
        });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

})


servidor.post('/perfil/capa', uploadPerfil.single('imagem'), (req, resp) => {
    let caminho = req.file.path;
    let extensao = req.file.mimetype;
    let nome = req.file.originalname;

    resp.send({
        caminho: caminho,
        extensao: extensao,
        nome: nome
    })
})




servidor.listen(
    5001,
    () => console.log('---> API subiu com sucesso na porta 5001!'));