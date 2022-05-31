const { Pessoas, Matriculas } = require('../models')

class PessoaController {
    static async pegaTodasAsPessoas(req,res){
        try {
            const todasAsPessoas = await Pessoas.findAll()
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
}

module.exports = PessoaController