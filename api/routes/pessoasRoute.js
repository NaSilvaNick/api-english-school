const express = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = express.Router()

router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
router.post('/pessoas', PessoaController.criaPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.apagaPessoa)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)

// Rotas das matriculas

router.get('/pessoas/:estudanteId/matriculas', PessoaController.pegaMatriculas)
router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.pegaUmaMatricula)
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
router.get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)
router.post('/pessoas/:estudanteId/matriculas', PessoaController.criaMatricula)
router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula)
router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.apagaMatricula)

module.exports = router;