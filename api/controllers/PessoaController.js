const { Pessoas, Matriculas, sequelize } = require('../models')
const { literal } = require('sequelize')
const { PessoasServices } = require('../services')

class PessoaController {

    static pessoasServices = new PessoasServices()

    static async pegaPessoasAtivas(req,res){
        try {
            const todasAtivas = await PessoaController
                                        .pessoasServices
                                        .pegaRegistosAtivos()
            return res.status(200).json(todasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodasAsPessoas(req,res){
        try {
            const todasAsPessoas = await PessoaController
                                        .pessoasServices
                                        .pegaTodosOsRegistos()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(req,res){
        try {
            const { id } = req.params
            const umaPessoa = await Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req,res){
        try {
            const novaPessoa = req.body
            const novaPessoaCriada = await Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req,res){
        try {
            const { id } = req.params
            const novasInfos = req.body
            await Pessoas.update(novasInfos, {where:{ id: Number(id) }})
            const pessoaAtualizada = await Pessoas.findOne({ where:{ id: Number(id) }})
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPessoa(req,res){
        try {
            const { id } = req.params
            await Pessoas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ message: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req,res){
        try {
            const { id } = req.params
            await Pessoas.restore({ where: { id: Number(id) } })
            return res.status(200).json({ message: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    // Parte das matriculas, particularmente acho estranho juntar as duas tabelas

    static async pegaUmaMatricula(req,res){
        try {
            const { estudanteId, matriculaId } = req.params
            const umaMatricula = await Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req,res){
        try {
            const { estudanteId } = req.params
            const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
            const novaMatriculaCriada = await Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req,res){
        try {
            const { estudanteId, matriculaId } = req.params
            const novasInfos = req.body
            await Matriculas.update(novasInfos,
                {
                    where: {
                        id: Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    }
                }                    
            )
            const matriculaAtualizada = await Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaMatricula(req,res){
        try {
            const { estudanteId, matriculaId } = req.params
            await Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json({ message: `id ${matriculaId} de matricula, do estudante de id = ${estudanteId} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculas(req,res){
        try {
            const { estudanteId } = req.params
            const pessoa = await Pessoas.findOne({where: { id: Number(estudanteId)}})
            const matriculas = await pessoa.getAulasMatriculadas()
            console.log(`\n${matriculas}\n`)
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculasPorTurma(req,res){
        try {
            const { turmaId } = req.params
            const todasAsMatriculas = await Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: "confirmado"
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            })
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTurmasLotadas(req,res){
        try {
            const lotacaoTurma = 2
            const turmasLotadas = await Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas.count)


        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoa(req,res){
        try {
            const { estudanteId } = req.params
            
            await PessoaController.pessoasServices.cancelaPessoasEMatriculas(Number(estudanteId))
            return res.status(200).json({ message: `matriculas referente ao estudante ${estudanteId} canceladas`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController